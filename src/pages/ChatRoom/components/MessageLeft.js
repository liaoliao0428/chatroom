import React from 'react';

const MessageLeft = ( props ) => {
    const { messageResponse } = props.messageData

    return (
        <div className='message-left'>
            <p className='message'>{messageResponse.message}</p>
            <div className='read-time-left'>
                <p>已讀</p>
                <p className='time'>2022-08-03 00:00</p>
            </div>                        
        </div>
    );
}

export default MessageLeft;
