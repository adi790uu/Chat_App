import { useState } from 'react';

import { useContext } from 'react';
import { createContext } from 'react';

const FriendsDispContext = createContext();

const FriendsDispProvider = ({ children }) => {
  const [friends, setFriends] = useState([]);

  return (
    <FriendsDispContext.Provider value={{ friends, setFriends }}>
      {children}
    </FriendsDispContext.Provider>
  );
};

export const FriendsDispState = () => {
  return useContext(FriendsDispContext);
};

export default FriendsDispProvider;
