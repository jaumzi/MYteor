import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';

import '../imports/modules/chat/index';

Meteor.startup(() => {

  const account_name_1 = 'admin';
  const account_1 = Accounts.findUserByUsername(account_name_1);
  if (!account_1) {
    Accounts.createUser({
      username: account_name_1,
      password: '123',
      isOnline: false
    });
  }

});
