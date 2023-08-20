import React from 'react';
import myImage from '../assets/images/download.jpeg';
import { ChatState } from '../Context/ChatProvider';
import { MessageState } from '../Context/MessageProvider';
import Message from './Message';
import io from 'socket.io-client';
import { useState } from 'react';
import { useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const socket = io('http://localhost:4000');

const ChatBox = () => {
  const { user } = ChatState();
  const loggedUser = localStorage.getItem('loggedUser');
  const { setMessages, messages } = MessageState();
  const [message, setMessage] = useState('');
  const [sender, setSender] = useState('');

  socket.on('message', ({ message, sender }) => {
    // console.log(sender);
    setSender(sender);
    const data3 = {
      sender: sender,
      message: message,
    };
    setMessages(prevMessages => [...prevMessages, data3]);
  });

  useEffect(() => {
    if (user) {
      const data = {
        friendId: user._id,
        myself: loggedUser,
      };
      socket.emit('joinRoom', data);
    }
  }, [user]);

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
      socket.emit('sendMessage', data);
      setMessages(prevMessages => [...prevMessages, data2]);
      setMessage('');
      // console.log(messages);
    }
  };
  // console.log(messages);

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
