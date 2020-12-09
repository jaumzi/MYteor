import React, { useRef } from 'react';
import { ChatMessageCollection } from '../../../api/ChatCollection';
import Input from '../../components/form-input/Input';
import FormUtils from '../../util/FormUtils';
import { withTracker } from 'meteor/react-meteor-data';
import { prepareComponent } from '../../util/hoc/HocComponents';

function ChatMessageFormComponent(props) {
    const formRef = useRef();
    const { chat, userLoggedId } = props;

    const handleSubmit = e => {
        e.preventDefault();

        const form = new FormUtils(formRef);

        let msg = form.getData('newMsg');

        if (!msg) {
            console.log('Valor inválido', msg);
            return;
        };

        ChatMessageCollection.insert({
            chatRoomId: chat._id,
            userId: userLoggedId,
            description: msg.trim(),
            createdAt: new Date()
        });

        form.clearData();
    };

    return (
        <div>
            <form className='chat-form' ref={formRef} onSubmit={handleSubmit}>
                <Input
                    type="text"
                    name="newMsg"
                    placeholder="Digite sua mensagem"
                    required
                />

                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}


const ChatMessageForm = withTracker((props) => {
    const userLoggedId = Meteor.userId();
    return {
        ...props,
        userLoggedId
    };
})(prepareComponent(ChatMessageFormComponent, { awaits: ['userLoggedId'] }));

export default ChatMessageForm;
