import React from 'react';

// 路由套件
import { Routes , Route } from 'react-router-dom'

// css
import './index.css'

// components
import List from './components/List';
import Chat from './components/Chat';

const ChatRoom = () => {
    return (
        <div className='chatRoom-wrap'>
            <List />
            <Routes>
                <Route path='/:roomId' element={<Chat />}/>
            </Routes>
        </div>
    );
}

export default ChatRoom;
