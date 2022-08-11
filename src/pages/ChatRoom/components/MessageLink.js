import { useEffect } from 'react';

// 路由組件
import { Link } from 'react-router-dom'

const MessageLink = ( props ) => {

    let { roomId , roomName , unRead , message , updateTime } = props.messageContainer
    
    let readCountClass = ''
    if (unRead == 0) {
        readCountClass = `none`
    }else if (unRead > 0 && unRead < 10) {
        readCountClass = `read-count-s`
    }else if( unRead > 10 && unRead < 1000 ){
        readCountClass = `read-count-m`
    }else{
        readCountClass = `read-count-l`
        unRead = '999+'
    }

    return (
        <Link to={`/chat/${roomId}`} >
            <div className='message-preview'>
                <span>{roomName}</span>
                <p>{message}</p>
            </div>
            <div className='message-status'>
                <span>{updateTime}</span>
                <p className={readCountClass}>{unRead}</p>
            </div>                    
        </Link>
    );
}

export default MessageLink;
