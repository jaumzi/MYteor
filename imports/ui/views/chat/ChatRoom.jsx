import React, { memo } from 'react';
import ChatMessageForm from './ChatMessageForm';
import ChatListMessage from './ChatListMessage';
import ChatRoomHeader from './ChatRoomHeader';

function ChatRoom(props) {
    const { chat } = props;
    console.log(chat);

    return (
        <>
            <div className="room-header" >
                <ChatRoomHeader chat={chat} />
            </div>
            <div className="room-body" >
                <ChatListMessage chat={chat} />
            </div>
            <div className="room-footer" >
                <ChatMessageForm chat={chat} />
            </div>
        </>
    );
}

export default memo(ChatRoom);