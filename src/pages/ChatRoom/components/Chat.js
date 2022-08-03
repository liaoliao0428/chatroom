import React from 'react';

// components
import MessageLeft from './MessageLeft';
import MessageRight from './MessageRight';

const Chat = () => {
    return (
        <div className='chat-wrap'>
            <div className='chat-wrap-main'>
                <div className='send-name-wrap'>
                    <span>傳給誰</span>
                </div>
                <div className='message-wrap'>
                    <MessageLeft />
                    <MessageRight />
                </div>
                <div className='send-message-wrap'>
                    <input type="text" />
                    <button>傳送</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
