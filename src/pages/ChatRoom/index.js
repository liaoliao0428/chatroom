import { useState , useEffect } from 'react';

// 第三方套件
import axios from 'axios';
import Cookies from 'js-cookie'
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

    // 取得使用者資料
    useEffect(() => {
        getUserData()
    } , [])

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

    // --------------------------------------------------- 連線 ------------------------------------------------------------------------
    // socket連線
    useEffect(() => {
        // 如果user有值 socket連線
        if( user && !ws.connected ){
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
        if( ws ){
            // 連線成功在 console 中打印訊息
            console.log('success connect!')
            // 設定socket監聽
            initWebSocket()
        }
    },[ ws ])

    // 設定socket監聽
    const initWebSocket = () => {
        console.log('socket啟動');

        // Server 通知完後再傳送 disConnection 通知關閉連線
        ws.on('disConnection', () => {
            ws.close()
        })
    }
    // --------------------------------------------------- 連線 ------------------------------------------------------------------------

    return (
        <div className='chatRoom-wrap'>
            <List user={ user } ws={ ws } />
            <Routes>
                <Route path='/:roomId' element={<Chat ws={ ws } />}/>
            </Routes>
        </div>
    );
}

export default ChatRoom;
