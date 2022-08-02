import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

// 路由套件
import { BrowserRouter as Router , Routes , Route , Navigate } from 'react-router-dom'

// Login套件
import Login from './pages/Login';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
      <Router>
        <Routes>
          <Route path='/login/*' element={<Login />}/>     
        </Routes>
      </Router>
    </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
