// region Imports
import { ApiBase } from '../../../api/base';
import { chatMessageSchema } from './chatMessageSchema';
import {getUser} from "/imports/libs/getUser";

// endregion

class ChatMessageApi extends ApiBase {
  constructor(props) {
    super('chatMessage', chatMessageSchema);
    this.serverInsert = this.serverInsert.bind(this)

    this.addPublication('getChatRoomMessages', (chatRoomID) => {
      console.log('on publication with roomId ' + chatRoomID)
      console.log(this.collectionInstance.find({roomId: chatRoomID}).fetch())
      //return this.collectionInstance.find({roomId: chatRoomID});
      return this.collectionInstance.find()
    });

    /*this.addPublication('getAllChatRoomMessages', () => {
      return this.collectionInstance.find();
    });*/

  }

  serverInsert(dataObj,context) {
    console.log('im on message insert')
    const {roomID, from, to , text, date} = dataObj
    console.log(dataObj)
    dataObj = this.checkDataBySchema(dataObj)
    if (Object.keys(dataObj).length !== 0)  {
      this.collectionInstance.insert(dataObj, (e, id) => {
        if (!e)
          console.log("inserted message with id " + id)
      })
    }
  }

}

export const chatMessageApi = new ChatMessageApi();
