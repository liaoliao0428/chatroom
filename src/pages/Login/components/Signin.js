import { useState } from 'react';

// 第三方套件
import axios from 'axios';
import Cookies from 'js-cookie'

// URL
import { URL } from '../../../global/url'

// route
import { Link , useNavigate } from 'react-router-dom'

const Signin = () => {
    const history = useNavigate();
    const [ account , setAccount ] = useState('')
    const [ password , setPassword ] = useState('')

    // 登入
    const signin = async () => {
        const url = `${URL}/login/signin`
        const { data } = await axios.post(url , {
            'account': account,
            'password': password
        })

        if ( data.login ) {
            Cookies.set('accessToken', data.accessToken)  //存
            history('/chat')
        }else{
            alert('帳號密碼錯誤')
        }
    }

    // 改變帳號
    const changeAccount = ( event ) => {
        setAccount(event.target.value)
    }

    // 改變密碼
    const changePassword = ( event ) => {
        setPassword(event.target.value)
    }

    return (
        <div className='signin-wrap'>
            <span>登入</span>
            <input type="text" placeholder="帳號" onChange={ changeAccount } value={ account } />
            <input type="text" placeholder="密碼" onChange={ changePassword } value={ password } />
            <button className="login-btn" onClick={ signin }>登入</button>
            <Link to='/login/signup'>建立帳號</Link>
        </div>
    );
}

export default Signin;
