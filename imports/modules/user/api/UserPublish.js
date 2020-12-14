
Meteor.startup(() => {

  ['user1', 'user2', 'user3', 'user4', 'user5'].forEach((username) => {
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username,
        password: '123',
      });
    }
  });

});
