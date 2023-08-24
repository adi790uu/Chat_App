import React from 'react';
import AddFriend from './AddFriend';
import { SearchState } from '../Context/SearchProvider';
import { SearchUserState } from '../Context/SearchUserProvider';

const SearchResults = () => {
  const { searched } = SearchUserState();
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
