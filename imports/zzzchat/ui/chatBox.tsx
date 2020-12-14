import React, {useRef} from 'react';
import {Input, Button, Header} from "semantic-ui-react";
import ChatMessage from "/imports/modules/chat/ui/chatMessage";
import {withTracker} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {chatMessageApi} from "/imports/modules/chat/api/chatMessageApi";
import {chatRoomApi} from "/imports/modules/chat/api/chatRoomApi";

const ChatBox = ({user, target, chatRoomId, chatMessages, history}) => {

  const messageForm = useRef(null)

  const handleSendMessage = () =>{
    const form = messageForm.current;
    const text = `${form['messageInput'].value}`;
    if (!text)
      return
    const d = new Date()
    let month = d.getMonth() + 1
    const time = d.getDate() + '/' + month + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()
    const docObj = {'roomId': chatRoomId, 'from' : user.username, 'to': target, 'text': text, 'date': time}
    Meteor.call('chatMessage.insert', docObj)
  }

  return (
    <div style={{'border': '1 px solid black'}}>
      <Header as='h4'> Chatting with {target} at room {chatRoomId ? chatRoomId : '...'}</Header>
      <div id="messages">
        <ul>
          {chatMessages.map(m => {
            return <li key={m.time}><ChatMessage message={m} host={ m.from !== user.username }/></li>
          })}
        </ul>

      </div>
      <form ref={messageForm} onSubmit={(e) => {e.preventDefault(); e.target.reset(); return false}}>
        <Input type="text" name={'messageInput'} placeholder="Type your message here..."/>
        <Button floated='right' onClick={handleSendMessage}>Send</Button>
      </form>
    </div>
  );
}

export const ChatBoxContainer = withTracker((props) => {
  const user = Meteor.user()
  const {target} = props
  const chatRoomsHandle = chatRoomApi.subscribe('getSingleChatRoom', user.username, props.target);
  //let chatRoom = chatRoomsHandle.ready() ? chatRoomApi.find({}).fetch() : []
  let chatRoom = chatRoomsHandle.ready() ? chatRoomApi.find({'host': user.username, 'target': target}).fetch() : []
  let chatRoomId = chatRoom.length === 0 ? undefined : chatRoom[0]._id
  chatRoom = chatRoomsHandle.ready() ? chatRoomApi.find({'host': target, 'target': user.username}).fetch() : chatRoom
  chatRoomId = chatRoom.length === 0 ? chatRoomId : chatRoom[0]._id
  const chatMessagesHandle = chatMessageApi.subscribe('getChatRoomMessages', chatRoomId);
  const chatMessages = chatMessagesHandle.ready() ? chatMessageApi.find({'roomId': chatRoomId}).fetch() : []

  console.log("chatbox container")
  console.log(chatRoom)
  console.log(chatRoomId)

  return ({
    user,
    target,
    chatRoomId,
    chatMessages,
  })
})(ChatBox)
