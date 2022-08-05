import React from 'react';

// 第三方套件
import Cookies from 'js-cookie'

// 路由組件
import { Link , useNavigate } from 'react-router-dom'

// components
import MessageLink from './MessageLink';

const List = () => {
    const history = useNavigate();
    const message = [1, 2, 3]

    // 登出
    const logout = () => {
        Cookies.remove('accessToken'); // 清除accseeToken
        history('/login')
    }

    return (
        <div className='list-wrap'>
            <div className='list-wrap-name'>
                <div>
                    <span>名字</span>
                    <button onClick={logout}>登出</button>          
                    <p>id : 1235434</p>
                    <input type="text" placeholder='輸入好友id'/>
                    <button>加入好友</button>
                </div>                
            </div>
            <div className='list-wrap-menu'>
                <span>訊息</span>
            </div>
            <div className='list-wrap-message'>
                {
                    message.map(item =><MessageLink />)
                }
            </div>
        </div>
    );
}

export default List;
