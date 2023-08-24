import React from 'react';
import myImage from '../assets/images/download.jpeg';
import { ChatState } from '../Context/ChatProvider';
const Message = ({ content }) => {
  const { user } = ChatState();
  if (content.sender !== user.username) {
    content.sender = 'You';
  }
  return (
    <div
      className={
        content.sender === user.username
          ? 'myMessage friendMsg'
          : 'myMessage myMsg'
      }
    >
      <img className="avatar" src={myImage} />
      <div className="maincon">
        <h2 className="msgUser">{content.sender}</h2>
        <p className="msgContent">
          {content.message ? content.message : content.msg}
        </p>
      </div>
    </div>
  );
};

export default Message;
