import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { ChatCollection } from '../../../api/ChatCollection';
import ChatItem from '../../components/chat/ChatItem';
import { prepareComponent } from '../../util/hoc/HocComponents';


function ChatList(props) {
    const { onSelectChat, data } = props;
    
    return (
        <>
            <h3>Conversas:</h3>
            <ul className="chat-list">
                {data.map((chat) => (
                    <ChatItem key={chat._id} chat={chat} onChatClick={onSelectChat} />
                ))}
            </ul>
        </>
    );
}

export default withTracker((props) => {
    const userLoggedId = Meteor.userId();

    let data = undefined;
    if (userLoggedId && Meteor.subscribe('chats', userLoggedId).ready()) {
        data = ChatCollection.find({}, {
            sort: { createdAt: -1 },
            transform: function (chat) {
                const userId = chat.users.filter(id => id !== userLoggedId)[0];
                const { username, _id, profile } = Meteor.users.findOne({ _id: userId });
                chat.users = [{ username, _id, profile }];
                return chat;
            }
        }).fetch();
    }

    return {
        ...props,
        userLoggedId,
        data
    };
})(prepareComponent(ChatList, { awaits: ['userLoggedId', 'data'] }));