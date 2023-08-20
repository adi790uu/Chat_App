import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const SearchContext = createContext();

const SearchProvider = ({ children }) => {
  const [friend, setFriend] = useState('');

  return (
    <SearchContext.Provider value={{ friend, setFriend }}>
      {children}
    </SearchContext.Provider>
  );
};

export const SearchState = () => {
  return useContext(SearchContext);
};

export default SearchProvider;
