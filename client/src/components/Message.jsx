import React from 'react';
import myImage from '../assets/images/download.jpeg';
const Message = ({ content }) => {
  // console.log(loggedUser);
  console.log(content.sender);
  console.log(content);
  // console.log(content);
  return (
    <div
      className={
        content.class === 'me' ? 'myMessage myMsg' : 'myMessage friendMsg'
      }
    >
      <img className="avatar" src={myImage} />
      <div className="maincon">
        <h2 className="msgUser">{content.sender}</h2>
        <p className="msgContent">{content.message}</p>
      </div>
    </div>
  );
};

export default Message;
