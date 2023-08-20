import React, { useState } from 'react';
import Navbar from './Navbar';
import SearchResults from './SearchResults';
import Chats from './Chats';
import { SearchState } from '../Context/SearchProvider';
import { SearchUserState } from '../Context/SearchUserProvider';
import api from '../api';

const SideBar = () => {
  const { friend, setFriend } = SearchState();
  const { searched, setSearched } = SearchUserState();

  const searchUserHandler = async e => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setFriend(e.target.value);
    console.log(friend);

    const response = await api.get('/users/searchUsers', {
      params: {
        search: friend,
      },
    });
    setSearched(response.data.users);
    // console.log(searched);
    console.log(response);
  };
  return (
    <div className="sideBar">
      <Navbar />
      <div className="searchUser">
        <input
          type="text"
          placeholder="Search username"
          value={friend}
          onChange={searchUserHandler}
        />
      </div>

      {friend ? <SearchResults /> : <Chats />}
    </div>
  );
};

export default SideBar;
