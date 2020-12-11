import CollectionUtil from '../../../api/CollectionUtil';

const ChatCollection = CollectionUtil.create('chat');
const ChatMessageCollection = CollectionUtil.create('chat_message');

export {
  ChatCollection,
  ChatMessageCollection
}
