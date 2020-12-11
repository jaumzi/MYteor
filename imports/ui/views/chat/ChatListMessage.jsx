import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { ChatCollection, ChatMessageCollection } from '../../../modules/chat/api/Collections';
import ChatMessageItem from '../../components/chat/ChatMessageItem';
import { prepareComponent } from '../../util/hoc/HocComponents';

function ChatListMessage(props) {
  const { data, userLoggedId } = props;

  return (
    <>
      <div className="list-messages-content" >
        {data.map((msg, i) => <ChatMessageItem key={`msg-${i}`} userLoggedId={userLoggedId} chatMsg={msg} />)}
      </div>
    </>
  );
}

export default withTracker((props) => {
  const { chat } = props;
  const userLoggedId = Meteor.userId();

  let data = undefined;
  if (userLoggedId && chat && Meteor.subscribe('chat-messages', { userId: userLoggedId, chatRoomId: chat._id }).ready()) {
    const chatDB = ChatCollection.find({ _id: chat._id }).fetch();

    if (chatDB) {
      const userLogged = Meteor.user();

      data = ChatMessageCollection.find({
        chatRoomId: chat._id
      }, {
        transform: function (chatMsg) {

          let user;
          if (userLoggedId !== chatMsg.userId) {
            user = Meteor.users.findOne({ _id: chatMsg.userId });
          } else {
            user = userLogged;
          }

          const { username, _id, profile } = user;
          chatMsg.user = { username, _id, profile };

          return chatMsg;
        }
      }).fetch();
    } else {
      console.log('não tem permissão para ver as mensagens deste chat');
    }
  }

  return {
    ...props,
    userLoggedId,
    data
  };
})(prepareComponent(ChatListMessage, { awaits: ['userLoggedId', 'data'] }));
