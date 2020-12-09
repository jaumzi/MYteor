import { Mongo } from 'meteor/mongo';
 
export const ChatCollection = new Mongo.Collection('chat');
export const ChatMessageCollection = new Mongo.Collection('chat_message');
