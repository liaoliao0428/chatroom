import { useState } from 'react';

const MessageRight = ( props ) => {
    const { message , time } = props.messageData

    return (
        <div className='message-right'>
            <div className='read-time-right'>
                <p className='read-right'>已讀</p>
                <p className='time'>{time}</p>
            </div>
            <p className='message'>{message}</p>
        </div>
    );
}

export default MessageRight;
