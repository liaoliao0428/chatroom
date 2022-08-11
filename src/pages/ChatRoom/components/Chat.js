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
    const { ws } = props
    const history = useNavigate();
    const { roomId } = useParams()
    const [ account , setAccount ] = useState('')
    const [ message , setMessage ] = useState('')
    const [ messageArray , setMessageArray ] = useState([])
    const [ roomName , setRoomName ] = useState('')
    const [ ckeckMessageId , setCheckMessageId ] = useState('')
    const [ readCheck , seReadCheck ] = useState('')
    const [ unReadIds , setUnReadIds ] = useState([])
    const [ unReadIdCkeck , setUnReadIdCheck ] = useState('')
    const messageRef = useRef()
    const chatWrapRef = useRef()

    // 一點進來把所有訊息改成已讀狀態
    useEffect(() => {
        if (unReadIds.length != 0) {
            // 把所有的訊息都標示已讀
            const updateAllReadCheckData = {
                roomId: roomId,
                unReadIds: unReadIds
            }

            setTimeout(() => {
                ws.emit('updateAllReadCheck' , updateAllReadCheckData)

            } , 200)

            unReadIds.forEach((unReadId) => {
                // 取得要標記為已讀的index
                const checkIndex = messageArray.map((item) => {
                    return item.id
                }).indexOf(unReadId.id)

                // 將messageArray指定的狀態改為以讀
                messageArray[checkIndex].status = true
            })

            seReadCheck((prev) => {
                return prev + 1
            })
            setUnReadIds([])
        }
    } , [ unReadIdCkeck ])

    // 已讀rerender
    useEffect(() => {
        if (ckeckMessageId) {
            // 取得要標記為已讀的index
            const checkIndex = messageArray.map((item) => {
                return item.id
            }).indexOf(ckeckMessageId)

            // 將messageArray指定的狀態改為以讀
            messageArray[checkIndex].status = true
            seReadCheck((prev) => {
                return prev + 1
            })
            setUnReadIds([])
        }        

    } , [ ckeckMessageId ])    

    // 網址更新就撈一次新的資料
    useEffect(() => {
        // focus到input上面
        focusOnMessageInout()

        // 取得房間名稱
        if (roomId) {
            setTimeout(() => {
                getRoomNameMessage()
            }, 200) 
        }    

        // 將原本的訊息陣列清除
        setMessageArray([])
        setUnReadIds([])

    } , [ history ])

    // ws有值設定socket事件的監聽
    useEffect(() => {
        if (ws) {
            initWebSocket()
            const initReadCheckData = {
                roomId: roomId
            }
            ws.emit('initReadCheck' , initReadCheckData)
        }                 
    } , [ ws , history])

    // 設定socket事件的監聽
    const initWebSocket = () => {
        // 先將舊的監聽事件關閉 避免造成監聽推積
        ws.off('sendMessageResponse')
        ws.off('readCheck')
        ws.off('readCheckYes')
        ws.off('initReadCheck')

        // 收到傳送訊息的回傳事件
        ws.on('sendMessageResponse' , messageResponse => {
            if (messageResponse.roomId === roomId) {
                const id = messageResponse.messageData.id
                setUnReadIds((prev) => {
                    return [...prev , {
                        id
                    }]
                })

                setMessageArray((prev) => {
                    return [...prev , {
                        'id': messageResponse.messageData.id,
                        'from': messageResponse.messageData.from,
                        'message': messageResponse.messageData.message,
                        'status': messageResponse.messageData.status,
                        'time': messageResponse.messageData.time
                    }]
                })
            }            
        })

        // 被詢問是否已讀
        ws.on('readCheck' , readCheckData => {
            // 如果傳送訊息的roomId跟當前的房間的roomId一樣 標註為已讀
            if (readCheckData.roomId === roomId) {
                ws.emit('readCheckYes' , readCheckData)
            }
        })

        // 已讀確認
        ws.on('readCheckYes' , readCheckData => {
            // 如果傳送訊息的roomId跟當前的房間的roomId一樣 標註為被已讀
            if (readCheckData.roomId === roomId) {
                setCheckMessageId(readCheckData.checkId)
            }
        })

        // 剛點進來的已讀確認
        ws.on('initReadCheck' , initReadCheckRoomId => {
            // 如果傳送訊息的roomId跟當前的房間的roomId一樣 標註為被已讀
            if (initReadCheckRoomId === roomId) {
                setUnReadIdCheck(prev => {
                    return prev+1
                })
            }
        })
    }

    // 傳送訊息
    const sendMessage = () => {
        const messageData = {
            'account': account,
            'roomId': roomId,
            'message': message
        }

        // 訊息欄位不為空 socket.emit傳送訊息
        if ( message ) {

            // socket傳送訊息事件
            ws.emit('sendMessage', messageData)

            // 訊息欄位清空
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

        if ( data ) {
            setAccount(data.account)
            setRoomName(data.roomName)
            setMessageArray(data.messageHistory)
        }
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

    // 滾輪滾到最底
    useEffect(() => {
        const current = chatWrapRef.current
        //scrollHeight是頁面的高度
        current.scrollTop = current.scrollHeight
    }, [ messageArray ])

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
