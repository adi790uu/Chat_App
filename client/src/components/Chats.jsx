import React from 'react';
import Chat from './Chat';
import { useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { FriendsDispState } from '../Context/FriendsDisp';

const Chats = () => {
  const { friends, setFriends } = FriendsDispState();
  // console.log(user);
  //   const handleClick = chat => {
  //     setSelectedUser(chat);
  //     console.log(selectedUser);
  //   };

  // console.log(friends);
  return (
    <div className="chats">
      {friends.map(chat => (
        <Chat
          key={chat._id}
          chat={chat}
          // name={chat.name}
          //   onSelectUser={setSelectedUser}
          //   selectedUser={selectedUser}
        />
      ))}
    </div>
  );
};

export default Chats;
