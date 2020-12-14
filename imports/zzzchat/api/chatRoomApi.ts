// region Imports
import { ApiBase } from '../../../api/base';
import { chatRoomSchema } from './chatRoomSchema';
import {getUser} from "/imports/libs/getUser";

// endregion

class ChatRoomApi extends ApiBase {
  constructor(props) {
    super('chatRoom', chatRoomSchema);

    this.addPublication('getChatRooms', () => {
      return this.collectionInstance.find();
    });

    this.addPublication('getSingleChatRoom', (host, target) => {
      console.log('getting single chat room', host, target)
      if (this.collectionInstance.find({'host': host, 'target': target}).count() === 1){
        console.log('1', this.collectionInstance.find({'host': host, 'target': target}).fetch())
        return this.collectionInstance.find({'host': host, 'target': target})
      }
      else{
        console.log('2', this.collectionInstance.find({'host': target, 'target': host}).fetch())
        return this.collectionInstance.find({'host': target, 'target': host})
      }
    });

    }

  serverInsert(dataObj,context) {
    console.log('im on server insert')
    const {host, target} = dataObj
    const reversedDataObj = {host: target, target: host}
    dataObj = this.checkDataBySchema(dataObj)
    console.log(dataObj)
    if (this.collectionInstance.find(dataObj).fetch().length === 0){
      if (this.collectionInstance.find(reversedDataObj).fetch().length === 0) {
        this.collectionInstance.insert(dataObj, (e, id) => {
          if (!e)
            console.log("inserted chatroom with id " + id)
        })
      }
      else
        console.log("chatroom already exists")
    }
    else
      console.log("chatroom already exists")
  }

}

export const chatRoomApi = new ChatRoomApi();
