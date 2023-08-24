import React from 'react';
import SideBar from '../components/SideBar';
import ChatBox from '../components/ChatBox';
import { FriendsDispState } from '../Context/FriendsDisp';
import { useEffect } from 'react';
import api from '../api';

const Home = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    window.location.href = '/';
  }
  const { setFriends } = FriendsDispState();
  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem('token');
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const response = await api.get('/users/friends');
      setFriends(response.data.friends.friends);
    };
    fetchFriends();
  }, []);

  return (
    <div className="home">
      <div className="container">
        <SideBar />
        <ChatBox />
      </div>
    </div>
  );
};

export default Home;
