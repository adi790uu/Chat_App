import React from 'react';
import myImage from '../assets/images/download.jpeg';
import { ChatState } from '../Context/ChatProvider';
import { MessageState } from '../Context/MessageProvider';

const Chat = ({ chat }) => {
  // console.log(chat);
  const { user, setUser } = ChatState();
  const { setMessages } = MessageState();

  const handleClick = () => {
    setUser(chat);
    setMessages([]);
    // console.log(user);
  };
  return (
    <>
      <div className="chat" onClick={handleClick}>
        <img className="friendImg" src={myImage} />
        <div className="userInfo">
          <p className="name">{chat.username}</p>
          <p className="latestMessage">Latest message</p>
        </div>
      </div>
    </>
  );
};

export default Chat;
