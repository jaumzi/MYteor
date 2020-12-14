import React from 'react';

const ChatMessage = (props) => {

    return (
        //<div style={props.style}>
        <div style={{'bgColor': 'green'}}>
          {props.host ?
            <a style={{'float': 'left'}}>{props.message.text}</a> :
            <a style={{'float': 'right'}}>{props.message.text}</a>}
        <br/>
        </div>
    );
}

export default ChatMessage;