import React from 'react';
import Sidebar from './Sidebar';
import '../styles/Body.css'

const Chat = () => {
  return (
    <div className="chat">
      <Sidebar />
      <div className="bodyof3-chat">
      <h1>This is chat page.</h1>
      </div>
    </div>
  );
};

export default Chat;
