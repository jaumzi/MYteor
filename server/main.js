import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { ChatCollection } from '../imports/api/ChatCollection';

import '../imports/api/chat/ChatPublish';


Meteor.startup(() => {

  const account_name_1 = 'user1';
  const account_1 = Accounts.findUserByUsername(account_name_1);
  if (!account_1) {
    Accounts.createUser({
      username: account_name_1,
      password: '123',
      isOnline: false
    });
  }

  const account_name_2 = 'user2';
  const account_2 = Accounts.findUserByUsername(account_name_2);
  if (!account_2) {
    Accounts.createUser({
      username: account_name_2,
      password: '123',
      isOnline: false
    });
  }

  const user_1 = Accounts.findUserByUsername(account_name_1);
  const user_2 = Accounts.findUserByUsername(account_name_2);
  const findChat = ChatCollection.find({
    "users": { "$in": [user_1._id, user_2._id] }
  });
  if (findChat.count() === 0) {
    ChatCollection.insert({
      users: [user_1._id, user_2._id],
      createdAt: new Date(),
    });
  }
});
