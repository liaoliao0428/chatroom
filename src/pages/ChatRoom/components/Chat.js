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
    const { account } = props.user
    const { ws } = props
    const history = useNavigate();
    const { roomId } = useParams()
    const [ message , setMessage ] = useState('')
    const [ messageArray , setMessageArray ] = useState([])
    const [ roomName , setRoomName ] = useState('')
    const messageRef = useRef()
    const chatWrapRef = useRef()

    // 滾輪滾到最底
    useEffect(() => {
        const current = chatWrapRef.current
        //scrollHeight是頁面的高度
        current.scrollTop = current.scrollHeight
      }, [ messageArray ])

    // 網址更新就撈一次新的資料
    useEffect(() => {
        // focus到input上面
        focusOnMessageInout()

        // 取得房間名稱
        if (roomId) {
            setTimeout(() => {
                getRoomNameMessage()
                getMessageHistory()
            }, 100) 
        }    

        // 將原本的訊息陣列清除
        setMessageArray([])

    } , [ history ])

    // ws有值設定socket事件的監聽
    useEffect(() => {
        if (ws) {
            initWebSocket()
        }                 
    } , [ ws ])

    // 設定socket事件的監聽
    const initWebSocket = () => {
        // 收到傳送訊息的回傳事件
        ws.on('sendMessageResponse' , messageResponse => {
            setMessageArray((prev) => {
                return [...prev , {
                    'from': messageResponse.from,
                    'message': messageResponse.message,
                    'time': messageResponse.time
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

            // focus到訊息input上面
            focusOnMessageInout()
        }else{
            return false
        }
    }

    // 取得聊天室名稱
    const getRoomNameMessage = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/messageContainer/getRoomNameMessage`
        const { data } = await axios.post(url , {
            'roomId': roomId
        } , {
            headers: {
                'authorization': accessToken
            }
        })

        if (data) {
            setRoomName(data.roomName)
            setMessageArray(data.messageHistory)
        }
    }

    // 取得聊天室歷史訊息
    const getMessageHistory = () => {
        ws.emit('getMessageHistory',12354354)
    }

    // focus到訊息input上面
    const focusOnMessageInout = () => {
        messageRef.current.focus()
    }

    // 更改輸入框的值
    const changeMessage = (event) => {
        setMessage(event.target.value)
    }

    // 訊息輸入框綁定enter傳送訊息事件
    const inputKeyUp = (e) => {
        // enter按鍵 keyCode == 13 
        if (e.keyCode === 13) {
            sendMessage()
        }
    }

    return (
        <div className='chat-wrap'>
            <div className='chat-wrap-main'>
                <div className='send-name-wrap'>
                    <span>{roomName}</span>
                </div>
                <div className='message-wrap' ref={chatWrapRef}>
                    {
                        messageArray.map(item => item.from == account ? <MessageRight key={ v4() } messageData={item}/> : <MessageLeft key={ v4() } messageData={item}/>)
                    }
                </div>
                <div className='send-message-wrap'>
                    <input type="text" onChange={changeMessage} value={message} ref={messageRef} onKeyUp={inputKeyUp}/>
                    <button onClick={sendMessage}>傳送</button>
                </div>
            </div>
        </div>
    );
}

export default Chat;
