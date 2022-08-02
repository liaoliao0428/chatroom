import React from 'react';

// route
import { Link } from 'react-router-dom';
// axios
import axios from 'axios';

const Signin = () => {
    return (
        <div className='signin-wrap'>
            <span>登入</span>
            <input type="text" placeholder="帳號" />
            <input type="text" placeholder="密碼" />
            <button class="login-btn">登入</button>
            <Link to='/login/signup'>建立帳號</Link>
        </div>
    );
}

export default Signin;
