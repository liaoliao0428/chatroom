import React from 'react';

// 路由組件
import { Link } from 'react-router-dom'

const MessageLink = () => {
    return (
        <Link to='/chat/roomId'>
            <div className='message-preview'>
                <span>名字</span>
                <p>訊息訊息訊息訊訊息訊息訊息訊訊息訊息訊息訊息訊</p>
            </div>
            <div className='message-status'>
                <span>20:00</span>
                <p className='read-count-s'>3</p>
            </div>                    
        </Link>
    );
}

export default MessageLink;
