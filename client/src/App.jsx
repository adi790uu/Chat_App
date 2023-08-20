import './App.scss';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import { useState, createContext } from 'react';
import ChatProvider from './Context/ChatProvider';
import Home from './pages/Home';
import MessageProvider from './Context/MessageProvider';
import SearchProvider from './Context/SearchProvider';
import SearchUserProvider from './Context/SearchUserProvider';
import FriendsDispProvider from './Context/FriendsDisp';

const App = () => {
  return (
    <ChatProvider>
      <FriendsDispProvider>
        <SearchUserProvider>
          <SearchProvider>
            <MessageProvider>
              <BrowserRouter>
                <Routes>
                  <Route exact path="/" element={<Login />} />
                  <Route path="/register" element={<SignUp />} />
                  <Route path="/home" element={<Home />} />
                </Routes>
              </BrowserRouter>
            </MessageProvider>
          </SearchProvider>
        </SearchUserProvider>
      </FriendsDispProvider>
    </ChatProvider>
  );
};

export default App;
