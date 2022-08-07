import { useState , useEffect } from 'react';

// 第三方套件
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie'
import { v4 } from 'uuid';
import { io } from 'socket.io-client'

// URL
import { URL } from '../../global/url';

// 路由套件
import { Routes , Route } from 'react-router-dom'

// css
import './index.css'

// components
import List from './components/List';
import Chat from './components/Chat';

const ChatRoom = () => {
    const [ user , setUser ] = useState('')
    const [ ws , setWs ] = useState('')
    const [ roomName , setRoomName ] = useState('')

    // 取得使用者資料
    useEffect(() => {
        getUserData()
    } , [])

    // --------------------------------------------------- 連線 ------------------------------------------------------------------------
    // socket連線
    useEffect(() => {
        // 如果user有值 socket連線
        if(user){
            //開啟
            setWs(io.connect('http://localhost:3002' , {
                query: {
                    'account': user.account
                }
            }))
        }
    } , [ user ])

    // 連線成功設定監聽
    useEffect(()=>{
        if(ws){
            //連線成功在 console 中打印訊息
            console.log('success connect!')
            //設定監聽
            initWebSocket()
        }
    },[ ws ])

    const initWebSocket = () => {
        //對 getMessage 設定監聽，如果 server 有透過 getMessage 傳送訊息，將會在此被捕捉
        ws.on('getMessage', message => {
            console.log(message)
        })
    }
    // --------------------------------------------------- 連線 ------------------------------------------------------------------------

    // 撈使用者訊息
    const getUserData = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/user/getUserData`
        const { data } = await axios.post(url , {} , {
            headers: {
                'authorization': accessToken
            }
        })

        if( data ){
            setUser(data)
        }
    }

    return (
        <div className='chatRoom-wrap'>
            <List user={ user } ws={ ws } setRoomName={ setRoomName }/>
            <Routes>
                <Route path='/:roomId' element={<Chat roomName={roomName}/>}/>
            </Routes>
        </div>
    );
}

export default ChatRoom;
