import { ChatCollection } from './api/ChatCollections';
import './api/ChatPublishs';

Meteor.startup(() => {

  if(Meteor.isServer) {

    const account_name_1 = 'user1';
    const account_1 = Accounts.findUserByEmail(account_name_1 + '@mail.com');
    if (!account_1) {
      Accounts.createUser({
        name: account_name_1,
        email: account_name_1 + '@mail.com',
        password: '123',
        isOnline: false
      });
    }

    const account_name_2 = 'user2';
    const account_2 = Accounts.findUserByEmail(account_name_2 + '@mail.com'); 
    if (!account_2) {
      Accounts.createUser({
        name: account_name_2,
        email: account_name_2 + '@mail.com',
        password: '123',
        isOnline: false
      });
    }

    const user_1 = Accounts.findUserByEmail(account_name_1 + '@mail.com');
    const user_2 = Accounts.findUserByEmail(account_name_2 + '@mail.com');   
    console.log(user_1, user_2)
    const findChat = ChatCollection.find({
      "users": { "$in": [user_1._id, user_2._id] }
    });
    if (findChat.count() === 0) {
      ChatCollection.insert({
        users: [user_1._id, user_2._id],
        createdAt: new Date(),
      });
    }

  }

});
