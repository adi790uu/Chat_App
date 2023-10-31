import React from 'react';
import myImage from '../assets/images/download.jpeg';
import { ChatState } from '../Context/ChatProvider';
import { MessageState } from '../Context/MessageProvider';

const Chat = ({ chat }) => {
  const { setUser } = ChatState();
  const { setMessages } = MessageState();

  const handleClick = async () => {
    setUser(chat);
    setMessages([]);
  };
  return (
    <>
      <div className="chat" onClick={handleClick}>
        <img className="friendImg" src={myImage} />
        <div className="userInfo">
          <p className="name">{chat.username}</p>
          {/* <p className="latestMessage">{messages[messages.length - 1].msg}</p> */}
        </div>
      </div>
    </>
  );
};

export default Chat;
