import { useState , useEffect } from 'react';

// 第三方套件
import { Link , useNavigate } from 'react-router-dom'
import axios from 'axios';
import Cookies from 'js-cookie'
import { v4 } from 'uuid';

// URL
import { URL } from '../../../global/url'

// components
import MessageLink from './MessageLink';

const List = () => {
    const history = useNavigate();
    const message = [1, 2, 3]
    const [ userName , setUserName ] = useState('')
    const [ account , setAccount ] = useState('')
    const [ friendId , setFriendId ] = useState('')

    // 取得使用者資料
    useEffect(() => {
        getUserData()
    } , [])

    // socket連線
    useEffect(() => {
        // 如果account有值 socket連線
        if(account){
            console.log('連線');
        }
    } , [ account ])

    // 撈使用者訊息
    const getUserData = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/chatroom/getUserData`
        const { data } = await axios.post(url , {} , {
            headers: {
                'authorization': accessToken
            }
        })

        if( data ){
            setUserName(data.userName)
            setAccount(data.account)
        }
    }

    // 加入好友
    const addFriend = async () => {
        const accessToken = Cookies.get('accessToken')
        const url = `${URL}/chatroom/addFriend`
        const { data } = await axios.post(url , {
            'friendId': friendId
        } , {
            headers: {
                'authorization': accessToken
            }
        })

        if ( data.addFriend ) {
            setFriendId('')
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

    return (
        <div className='list-wrap'>
            <div className='list-wrap-name'>
                <div>
                    <span>{userName}</span>
                    <button onClick={logout}>登出</button>          
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
                    message.map(item => <MessageLink key={ v4() }/>)
                }
            </div>
        </div>
    );
}

export default List;
