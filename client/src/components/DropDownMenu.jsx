import React, { useState } from 'react';
import myImage from '../assets/images/download.jpeg';
function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <div className="dropdown">
      <img
        src={myImage}
        alt="Image"
        onClick={toggleDropdown}
        className="logImg"
      />
      {isOpen && (
        <div className="dropdown-content">
          <button className="logOut" onClick={handleLogOut}>
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}

export default DropdownMenu;
