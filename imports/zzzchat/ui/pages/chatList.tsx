import React from 'react';
import {Meteor} from 'meteor/meteor'
import {withTracker} from "meteor/react-meteor-data";
import {userprofileApi} from '../../../../userprofile/api/UserProfileApi'
import {chatRoomApi} from '../../../../modules/chat/api/chatRoomApi'
import {Container, Header} from "semantic-ui-react";
import {ChatBoxContainer} from "/imports/modules/chat/ui/chatBox";
import {chatMessageApi} from "/imports/modules/chat/api/chatMessageApi";

const ChatList = ({users,user,history}) => {

    const [activeChats, setActiveChats] = React.useState({})
    
    const handleStartChat = (target) => {
      if (user.username === target)
        return
      console.log('starting chat between ' + user.username + ' and ' + target)
      let newChats = {... activeChats};
      newChats[target] = !newChats[target]
      setActiveChats(newChats)
      Meteor.call('chatRoom.insert', {'host' : user.username, 'target':target})
    }

    const exampleMessages = [{"text": 'uaheuhaeuhaeuhae', 'time': '10:20'}, {"text": 'aeooooooooooooooooooo', 'time': '10:22'},
        {"text": 'HAHASHAHAHAHA', 'time': '10:25'}]

    return (
        <Container text fluid>
            <Header as='h2'>{'Active Users'}</Header>        
            <ul>
              {users.map((u) => {
                return (<li key={u.username} onClick={() => handleStartChat(u.username)}>{u.username}</li>)
              })}              
            </ul>
            {users.map((u) => {
                return activeChats[u.username] ? <ChatBoxContainer target={u.username}/> : ''
            })}            
        </Container>
    );
}

export const ChatListContainer = withTracker((props) => {
  const user = Meteor.user()
  const subHandle = userprofileApi.subscribe('default',{});
  const users = subHandle.ready()?userprofileApi.find({}).fetch().filter(u => u.username !== user.username):[]

  return ({
      users,
      user
  })
})(ChatList)
