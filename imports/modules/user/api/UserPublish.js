const { default: EnumPresence } = require("../util/EnumPresence");
const { setUserstatus } = require("../util/UserPresenceUtil");
const { UserPresenceServers, UserPresenceSessions } = require("./UserCollections");

// serverId - unique per server per restart
var serverId = Math.random().toString(36).substr(2, 9);

// keep track of which servers are online
Meteor.setInterval(function () {
  let find = { serverId: serverId };
  let modifier = { $set: { ping: new Date() } };
  UserPresenceServers.upsert(find, modifier);
}, 1000 * 30);

// remove old servers and sessions
// update status of users connected to that server
Meteor.setInterval(function () {
  let cutoff = new Date();
  cutoff.setMinutes(new Date().getMinutes() - 5);

  UserPresenceServers.find({ ping: { $lt: cutoff } }).forEach(function (server) {
    UserPresenceServers.remove(server._id);
    UserPresenceSessions.remove({ serverId: server.serverId });

    Meteor.users.find({ 'profile.presence.serverId': server.serverId }).forEach(function (user) {
      trackUserStatus(user._id);
    });
  });
}, 1000 * 10);

// track user connection and disconnection
Meteor.publish(null, function () {
  var self = this;

  if (self.userId && self.connection && self.connection.id) {
    userConnected(self.userId, self.connection);

    self.onStop(function () {
      userDisconnected(self.userId, self.connection);
    });
  }

  self.ready();
});

var userConnected = function (userId, connection) {
  UserPresenceSessions.insert({ serverId: serverId, userId: userId, connectionId: connection.id, createdAt: new Date() });
  trackUserStatus(userId, connection);
}
var userDisconnected = function (userId, connection) {
  UserPresenceSessions.remove({ userId: userId, connectionId: connection.id });
  trackUserStatus(userId, connection);
}

var trackUserStatus = function (userId, connection) {
  const newPresence = {
    serverId: serverId
  }

  if (connection) {
    newPresence.clientAddress = connection.clientAddress;
    newPresence.httpHeaders = connection.httpHeaders;
  }

  const isOnline = UserPresenceSessions.find({ userId: userId }).count();

  if (isOnline) {
    newPresence.status = EnumPresence.ONLINE;
    newPresence.lastOnlineDate = new Date();

    setUserstatus(userId, newPresence);
  } else {
    newPresence.status = EnumPresence.OFFLINE;

    setUserstatus(userId, newPresence);
  }
}
