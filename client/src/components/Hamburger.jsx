// Hamburger.js
import React from 'react';
import { useSidebar } from '../../context/SideBarContext';

const Hamburger = () => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className="fixed top-4 left-4 z-50 p-2 bg-gray-100 text-white rounded"
    >
      ☰
    </button>
  );
};

export default Hamburger;
