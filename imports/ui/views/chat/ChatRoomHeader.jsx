import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import EnumPresence from '../../../modules/user/util/EnumPresence';
import { prepareComponent } from '../../util/hoc/HocComponents';

function ChatRoomHeader(props) {
    const { userChat } = props;

    return (
        <>
            <div className="avatar" />

            <div className="user-info-content" >
                <span className="chat-text">
                    {userChat.username} ({userChat?.profile?.presence?.status ?? EnumPresence.OFFLINE})
                    <span className="" ></span>
                </span>
                {userChat?.profile?.presence && userChat?.profile?.presence?.status !== EnumPresence.ONLINE && (
                    <span className="user-last-online" >
                        Ultima vez online em: {new Date(userChat?.profile?.presence?.lastOnlineDate).toLocaleString()}
                    </span>
                )}
            </div>
        </>
    );
}

export default withTracker((props) => {
    const { chat } = props;
    const { username, _id, profile } = Meteor.users.find({ _id: chat.userChat._id }).fetch()[0];

    return {
        ...props,
        userChat: { username, _id, profile }
    };
})(prepareComponent(ChatRoomHeader, { awaits: ['userChat'] }));
