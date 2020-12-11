import React, { memo } from 'react';

import './ChatMessageItemStyle.css';

const ChatMessageItem = (props) => {
  const { chatMsg, userLoggedId } = props;

  const sendedByMe = chatMsg.userId === userLoggedId;
  const username = chatMsg.user._id !== userLoggedId ? chatMsg.user.username : 'Eu';
  const dateMsg = new Date(chatMsg.createdAt).toLocaleString();

  return (
    <div className="msg-item" >
      <div className={`msg-item-content ${sendedByMe ? 'sended' : 'received'}`}>
        <span className='msg-item-description' >
          <div className="msg-item-avatar" />
          <div className='msg-item-description-info' >
            <span className="msg-info-username">
              {username}
            </span>
            <span>{chatMsg.description}</span>
          </div>
        </span>
        <span className='msg-item-date' >
          {dateMsg}
        </span>
      </div>
    </div>
  );
};

export default memo(ChatMessageItem);
