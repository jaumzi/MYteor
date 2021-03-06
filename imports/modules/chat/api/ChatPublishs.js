import { Meteor } from 'meteor/meteor';
import { ChatCollection, ChatMessageCollection } from './ChatCollections';

Meteor.publish('chats', userId => {

  return [
    Meteor.users.find({}),
    ChatCollection.find({
      'users': { '$in': [userId] }
    })
  ];
});

Meteor.publish('chat-messages', ({ userId, chatRoomId }) => {

  if (!userId || !chatRoomId) {
    return null;
  }

  return [
    Meteor.users.find({}),
    ChatCollection.find({
      _id: chatRoomId,
      'users': { '$in': [userId] }
    }),
    ChatMessageCollection.find({
      chatRoomId
    }),
  ];
});
