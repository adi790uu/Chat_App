import React from 'react';
import Chat from './Chat';
import { FriendsDispState } from '../Context/FriendsDisp';

const Chats = () => {
  const { friends } = FriendsDispState();
  return (
    <div className="chats">
      {friends.map(chat => (
        <Chat key={chat._id} chat={chat} />
      ))}
    </div>
  );
};

export default Chats;
