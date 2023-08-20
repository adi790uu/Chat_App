import React from 'react';
import myImage from '../assets/images/download.jpeg';
import { ChatState } from '../Context/ChatProvider';
import { MessageState } from '../Context/MessageProvider';
import { SearchState } from '../Context/SearchProvider';
import { FriendsDispState } from '../Context/FriendsDisp';
import api from '../api';

const Chat = ({ chat }) => {
  console.log(chat);
  const { user, setUser } = ChatState();
  const { setMessages } = MessageState();
  const { friend, setFriend } = SearchState();
  const { friends, setFriends } = FriendsDispState();

  const handleClick = async () => {
    const response = await api.post('/users/add', {
      friendId: chat._id,
    });
    // console.log(response);
    setUser(chat);
    setFriend('');
    setFriends([...friends, chat]);
    // console.log(friends);
    setMessages([]);
    // console.log(user);
  };
  return (
    <>
      <div className="chat" onClick={handleClick}>
        <img className="friendImg" src={myImage} />
        <div className="userInfo">
          <p className="name">{chat.username}</p>
        </div>
      </div>
    </>
  );
};

export default Chat;
