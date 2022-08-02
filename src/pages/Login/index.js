import React from 'react';

// 路由組件
import { Route , Routes } from 'react-router-dom'

// css
import './index.css'
// components
import Signin from './components/Signin';
import Signup from './components/Signup';

const Login = () => {
    return (
        <div className='login-wrap'>
            <Routes>
                <Route path='/' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
            </Routes>
        </div>
    );
}

export default Login;
