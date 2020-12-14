

// user connections
const UserPresenceSessions = new Mongo.Collection('userpresencesessions');

// list of servers
const UserPresenceServers = new Mongo.Collection('userpresenceservers');


UserPresenceServers._ensureIndex({ ping: 1 });
UserPresenceServers._ensureIndex({ serverId: 1 });
Meteor.users._ensureIndex({ 'profile.presence.serverId': 1 });
UserPresenceSessions._ensureIndex({ userId: 1 });


export {
  UserPresenceServers,
  UserPresenceSessions
}
