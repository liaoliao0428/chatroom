import { useState } from 'react';

// 第三方套件
import axios from 'axios';

// URL
import { URL } from '../../../global/url'

// route
import { Link , useNavigate } from 'react-router-dom'

const Signup = () => {
    const history = useNavigate();
    const [ userName , setUserName ] = useState('')
    const [ account , setAccount ] = useState('')
    const [ password , setPassword ] = useState('')
    
    // 建立帳號
    const signup = async () => {
        const url = `${URL}/login/signup`
        const { data } = await axios.post(url , {
            'userName': userName,
            'account': account,
            'password': password
        }) 

        if ( data ) {
            history('/login')
        }else{
            alert('帳號重複，請選擇新帳號')
        }
    }

    // 改變用戶名稱
    const changeUserName = ( event ) => {
        setUserName(event.target.value)
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
        <div className='signup-wrap'>
            <span>建立帳號</span>
            <input type="text" placeholder="用戶名稱" onChange={ changeUserName } value={ userName } />
            <input type="text" placeholder="帳號" onChange={ changeAccount } value={ account } />
            <input type="text" placeholder="密碼" onChange={ changePassword } value={ password } />
            <button className="login-btn" onClick={signup}>建立</button>
            <Link to='/login'>回登入頁</Link>
        </div>
    );
}

export default Signup;
