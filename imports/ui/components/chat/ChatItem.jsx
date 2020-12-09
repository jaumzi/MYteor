import React, { memo, } from 'react';
import EnumPresence from '../../util/EnumPresence';

import './ChatItemStyle.css';

const ChatItem = (props) => {
    const { chat, onChatClick } = props;

    const userChat = chat.users[0];

    return (
        <li className="item-chat" onClick={() => onChatClick({ ...chat, userChat })} >
            <div className="avatar" />

            <span className="chat-item-text">
                {userChat?.username}
            </span>

            {/* <button className='chat-btn-delete' onClick={() => onDeleteClick(chat)}>&times;</button> */}
        </li>
    );
};

export default memo(ChatItem);
