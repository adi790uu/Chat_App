import { useState } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';

const SearchUserContext = createContext();

const SearchUserProvider = ({ children }) => {
  const [searched, setSearched] = useState([]);

  return (
    <SearchUserContext.Provider value={{ searched, setSearched }}>
      {children}
    </SearchUserContext.Provider>
  );
};

export const SearchUserState = () => {
  return useContext(SearchUserContext);
};

export default SearchUserProvider;
