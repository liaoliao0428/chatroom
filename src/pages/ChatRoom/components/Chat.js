import Cookies from 'js-cookie';
import { useState , useEffect , useRef } from 'react';

// 第三方套件
import { useParams , useNavigate } from 'react-router-dom';
import { v4 } from 'uuid';
import axios from 'axios';

// URL
import { URL } from '../../../global/url';

// components
import MessageLeft from './MessageLeft';
import MessageRight from './MessageRight';

const Chat = ( props ) => {
    const history = useNavigate();
    const { account } = props.user
    const { ws } = props
    const [ message , setMessage ] = useState('')
    const [ messageArray , setMessageArray ] = useState([])
    const { roomId } = useParams()
    const [ roomName , setRoomName ] = useState('')

    useEffect(() => {
        if (roomId) {
            setTimeout(() => {
                getRoomName()
            }, 50) 
        }         
    } , [ history ])

    // ws有值設定socket事件的監聽
    useEffect(() => {
        if (ws) {
            // getRoomName()
            initWebSocket()
        }                 
    } , [ ws ])

    // 設定socket事件的監聽
    const initWebSocket = () => {
        ws.on('sendMessageResponse' , messageResponse => {
            setMessageArray((prev) => {
                return [...prev , {
                    messageResponse
                }]
            })
        })
    }

    // 傳送訊息
    const sendMessage = () => {
        const messageData = {
            'account': account,
            'roomId': roomId,
            'message': message
        }

        if (message) {
            ws.emit('sendMessage', messageData)
            setMessage('')
        }else{
            return false
        }
    }

    // 取得聊天室名稱
    const getRoomName = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/messageContainer/getRoomName`
        const { data } = await axios.post(url , {
            'roomId': roomId
        } , {
            headers: {
                'authorization': accessToken
            }
        })

        if (data) {
            setRoomName(data.roomName)
        }
    }

    // 更改輸入框的值
    const changeMessage = (event) => {
        setMessage(event.target.value)
    }
    return (
        <div className='chat-wrap'>
            {/* <button onClick={getRoomName}>1231354354</button> */}
            <div className='chat-wrap-main'>
                <div className='send-name-wrap'>
                    <span>{roomName}</span>
                </div>
                <div className='message-wrap'>
                    {
                        messageArray.map(item => item.messageResponse.from == account ? <MessageRight key={ v4() } messageData={item}/> : <MessageLeft key={ v4() } messageData={item}/>)
                    }
                </div>
                <div className='send-message-wrap'>
                    <input type="text" onChange={changeMessage} value={message}/>
                    <button onClick={sendMessage}>傳送</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
