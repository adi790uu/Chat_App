import React from 'react';
import DropdownMenu from './DropDownMenu';

const Navbar = () => {
  return (
    <div className="Navbar">
      <span className="title">ChatterBox</span>
      <DropdownMenu />
    </div>
  );
};

export default Navbar;
