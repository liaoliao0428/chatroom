import { useState } from 'react';

const MessageRight = ( props ) => {
    const { messageResponse } = props.messageData

    return (
        <div className='message-right'>
            <div className='read-time-right'>
                <p className='read-right'>已讀</p>
                <p className='time'>2022-08-03 00:00</p>
            </div>
            <p className='message'>{messageResponse.message}</p>
        </div>
    );
}

export default MessageRight;
