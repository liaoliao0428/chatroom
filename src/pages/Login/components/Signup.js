import React from 'react';

// route
import { Link , useNavigate } from 'react-router-dom'

// axios
import axios from 'axios';

const Signup = () => {
    const history = useNavigate();

    // 回登入頁
    const login = () => {
        history('/login')
    }

    return (
        <div className='signup-wrap'>
            <span>建立帳號</span>
            <input type="text" placeholder="用戶名稱" />
            <input type="text" placeholder="帳號" />
            <input type="text" placeholder="密碼" />
            <button class="login-btn" onClick={login}>建立</button>
            <Link to='/login'>回登入頁</Link>
        </div>
    );
}

export default Signup;
