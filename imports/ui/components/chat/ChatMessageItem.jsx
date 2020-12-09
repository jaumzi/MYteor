import React, { memo, } from 'react';

import './ChatMessageItemStyle.css';

const ChatMessageItem = (props) => {
    const { chatMsg, userLoggedId } = props;
    const sendedByMe = chatMsg.userId === userLoggedId;

    return (
        <div className="msg-item" >
            <div className={`msg-item-content ${sendedByMe ? 'sended' : 'received'}`}>
                <span className='msg-item-description' >{chatMsg.description}</span>
                <span className='msg-item-date' >{new Date(chatMsg.createdAt).toLocaleString()}</span>
            </div>
        </div>
    );
};

export default memo(ChatMessageItem);
