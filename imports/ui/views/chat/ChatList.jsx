import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import ChatItem from '../../components/chat/ChatItem';
import { prepareComponent } from '../../util/hoc/HocComponents';
import { ChatCollection } from '../../../modules/chat/api/ChatCollections';
import PersonItem from '../../components/chat/PersonItem';


function ChatList(props) {
  const { onSelectChat, chats, users } = props;

  // console.log(chats, users);
  const handleCreateChat = (data) => {
    console.log(data);

  }

  return (
    <>
      <div className="chat-list" >

        <h3>Pessoas:</h3>
        <ul>
          {console.log(users)}
          {users.map((u) => (
            <PersonItem key={u._id} person={u} isRegistered={false} />
          ))}
        </ul>

        <h3>Conversas:</h3>
        <ul>
          {chats.map((chat) => (
            <ChatItem key={chat._id} chat={chat} onChatClick={onSelectChat} isRegistered={true} />
          ))}
        </ul>

      </div>
    </>
  );
}

export default withTracker((props) => {
  const userLoggedId = Meteor.userId();

  let users, chats;
  if (userLoggedId && Meteor.subscribe('chats', userLoggedId).ready()) {
    chats = ChatCollection.find({}, {
      sort: { createdAt: -1 },
      transform: function (chat) {
        const userId = chat.users.filter(id => id !== userLoggedId)[0];
        const { username, _id, presence } = Meteor.users.findOne({ _id: userId });
        chat.users = [{ username, _id, presence }];
        return chat;
      }
    }).fetch();

    users = Meteor.users.find({}, {
      transform: function (user) {
        const { username, _id, presence } = user;
        return { username, _id, presence };
      }
    }).fetch();
  }

  return {
    ...props,
    userLoggedId,
    chats,
    users
  };
})(prepareComponent(ChatList, { awaits: ['userLoggedId', 'chats', 'users'] }));
