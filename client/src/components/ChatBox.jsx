import React, { useDeferredValue } from 'react';
import myImage from '../assets/images/download.jpeg';
import { ChatState } from '../Context/ChatProvider';
import { MessageState } from '../Context/MessageProvider';
import Message from './Message';
import io from 'socket.io-client';
import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import api from '../api';

const socket = io('http://localhost:4000');

const ChatBox = () => {
  const { user } = ChatState();
  const loggedUser = localStorage.getItem('loggedUser');
  const { messages, setMessages } = MessageState();
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      const data = {
        friendId: user._id,
        myself: loggedUser,
      };

      const fetchUsers = async () => {
        const msgs = await api.post('/getMessages', data);
        setMessages(msgs.data.data[0].messages);
      };
      fetchUsers();
      socket.emit('joinRoom', data);
    }
  }, [user]);

  socket.on('message', ({ message, sender }) => {
    const data3 = {
      sender: sender,
      message: message,
    };
    setMessages([...messages, data3]);
  });

  const handleSend = e => {
    e.preventDefault();
    const data = {
      user: user,
      message: message,
      loggedIn: loggedUser,
    };
    const data2 = {
      sender: 'You',
      message: message,
    };

    if (user && message) {
      setMessages([...messages, data2]);
      socket.emit('sendMessage', data);
      setMessage('');
    }
  };

  return (
    <>
      {user ? (
        <div className="chatBox">
          <div className="infoBar">
            <img className="receiver" src={myImage} />
            <span className="userName">{user.username}</span>
          </div>
          <div className="MessageArea">
            {messages.map(msg => {
              return <Message key={uuidv4()} content={msg} />;
            })}
          </div>
          <div className="input-container">
            <input
              className="input-field"
              type="text"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <button className="but" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <h1>Select a user</h1>
      )}
    </>
  );
};

export default ChatBox;
