import React from 'react';
import AddFriend from './AddFriend';
import { SearchState } from '../Context/SearchProvider';
import { SearchUserState } from '../Context/SearchUserProvider';

const SearchResults = () => {
  //  const users = [
  //   {
  //     id: 1,
  //     name: 'Aditya',
  //   },
  // ];
  const { searched, setSearched } = SearchUserState();
  console.log(searched);

  return (
    <div className="chats">
      {searched.map(chat => (
        <AddFriend key={chat._id} chat={chat} />
      ))}
    </div>
  );
};

export default SearchResults;
