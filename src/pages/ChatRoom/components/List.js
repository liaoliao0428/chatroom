import { useState , useEffect } from 'react';

// 第三方套件
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie'
import { v4 } from 'uuid';
import { io } from 'socket.io-client'
 
// URL
import { URL } from '../../../global/url'

// components
import MessageLink from './MessageLink';

const List = ( props ) => {
    const history = useNavigate();
    const { userName , account } = props.user
    const { ws , setRoomName } = props
    const [ friendId , setFriendId ] = useState('')
    const [ messageContainer , setMessageContainer ] = useState([])

    useEffect(() => {
        getMessageContainer()
    } , [])

    // 加入好友
    const addFriend = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/user/addFriend`
        const { data } = await axios.post(url , {
            'userName': userName,
            'friendId': friendId
        } , {
            headers: {
                'authorization': accessToken
            }
        })

        if ( data.addFriend ) {
            setFriendId('')
            // getMessageContainer()
        }else{
            alert(data.addFriendResponse)
        }
    }

    // 登出
    const logout = () => {
        Cookies.remove('accessToken'); // 清除accseeToken
        history('/login')
    }

    // 更改friendId
    const changeFriendId = (event) => {
        setFriendId(event.target.value)
    }

    // 撈訊息容器
    const getMessageContainer = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/messageContainer/getMessageContainer`
        const { data } = await axios.post(url , {} , {
            headers: {
                'authorization': accessToken
            }
        })

        if ( data ) {
            setMessageContainer(data.room)
        }
    }

    // --------------------------------------------------- 連線 ------------------------------------------------------------------------
    const sendMessage = () => {
        //以 emit 送訊息，並以 getMessage 為名稱送給 server 捕捉
        ws.emit('getMessage', '只回傳給發送訊息的 client')
    }
    // --------------------------------------------------- 連線 ------------------------------------------------------------------------

    // 點擊溝改聊天室名稱
    const changeRoomName = (roomName) => {
        setRoomName(roomName)
    }

    return (
        <div className='list-wrap'>
            <div className='list-wrap-name'>
                <div>
                    <span>{userName}</span>
                    <button onClick={logout}>登出</button>
                    <button onClick={sendMessage}>測試</button>          
                    <p>id : {account}</p>
                    <input type="text" placeholder='輸入好友id' onChange={changeFriendId} value={friendId} />
                    <button onClick={addFriend}>加入好友</button>
                </div>                
            </div>
            <div className='list-wrap-menu'>
                <span>訊息</span>
            </div>
            <div className='list-wrap-message'>
                {
                    messageContainer.map(item => <MessageLink key={ v4() } onClick={() => changeRoomName(item.roomName)}  messageContainer={item} />)
                }
            </div>
        </div>
    );
}

export default List;
