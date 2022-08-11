const MessageRight = ( props ) => {
    const { message , time , status } = props.messageData

    return (
        <div className='message-right'>
            <div className='read-time-right'>
                {
                    status == true ? <p className='read-right'>已讀</p> : null
                }                
                <p className='time'>{time}</p>
            </div>
            <p className='message'>{message}</p>
        </div>
    );
}

export default MessageRight;
