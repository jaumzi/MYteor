import React, { useState } from 'react';
import AdminLayout from '../../layout/admin/AdminLayout';
import ChatList from './ChatList';
import ChatRoom from './ChatRoom';

import './ChatViewStyle.css';

const ChatView = () => {

    const [state, setState] = useState({
        chatSelected: undefined
    });
    const { chatSelected } = state;

    const selectChat = (chat) => {
        setState(prev => ({
            ...prev,
            chatSelected: chat
        }))
    }

    return (
        <>
            <AdminLayout title="Chat" >
                <div className="chat-content" >
                    <div className="content-chat-list">
                        <ChatList onSelectChat={selectChat} />
                    </div>
                    <div className="chat-room-content">
                        {chatSelected
                            ? <ChatRoom chat={chatSelected} />
                            : <h3>Nenhuma conversa selecionada.</h3>}
                    </div>
                </div>
            </AdminLayout>
        </>
    );
};

export default ChatView;
