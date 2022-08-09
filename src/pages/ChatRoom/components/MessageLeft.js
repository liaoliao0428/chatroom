import React from 'react';

const MessageLeft = ( props ) => {
    const { message , time } = props.messageData

    return (
        <div className='message-left'>
            <p className='message'>{message}</p>
            <div className='read-time-left'>
                {/* <p>已讀</p> */}
                <p className='time'>{time}</p>
            </div>                        
        </div>
    );
}

export default MessageLeft;
