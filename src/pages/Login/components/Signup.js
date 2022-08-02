import React from 'react';

// route
import { Link } from 'react-router-dom';
// axios
import axios from 'axios';

const Signup = () => {
    return (
        <div className='signup-wrap'>
            <span>建立帳號</span>
            <input type="text" placeholder="用戶名稱" />
            <input type="text" placeholder="帳號" />
            <input type="text" placeholder="密碼" />
            <button class="login-btn">建立</button>
            <Link to='/login'>回登入頁</Link>
        </div>
    );
}

export default Signup;
