import React from 'react';

// route
import { Link , useNavigate } from 'react-router-dom'

// axios
import axios from 'axios';

const Signin = () => {
    const history = useNavigate();

    // 登入
    const signin = () => {
        history('/chat')
    }

    return (
        <div className='signin-wrap'>
            <span>登入</span>
            <input type="text" placeholder="帳號" />
            <input type="text" placeholder="密碼" />
            <button class="login-btn" onClick={signin}>登入</button>
            <Link to='/login/signup'>建立帳號</Link>
        </div>
    );
}

export default Signin;
