// 

import React, { useState, useEffect } from 'react';
import {
  Home,
  FileText,
  PlusSquare,
  LayoutDashboard,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from 'lucide-react';

// Main App component
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  // Close mobile sidebar on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Sidebar navigation items
  const navItems = [
    { name: 'Home', icon: Home, link: '/' },
    { name: 'All Posts', icon: FileText, link: '/' },
    { name: 'Create Post', icon: PlusSquare, link: '/createpost' },
    { name: 'Dashboard', icon: LayoutDashboard, link: '#' },
  ];

  // User profile data
  const user = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    avatar: 'https://placehold.co/40x40/FFFFFF/000000?text=JD', // Placeholder avatar
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 z-0">
      {/* Mobile Header with Hamburger button */}
      <header className="fixed top-[60px] left-0 w-full z-30 md:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md bg-white dark:bg-gray-800 text-gray-800 dark:text-white"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        <span className="text-xl font-bold text-gray-900 dark:text-white">BlogSphere</span>
        <div className="w-10" /> {/* Spacer for alignment */}
      </header>

      {/* Mobile Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleSidebar}
      />

      {/* Sidebar container */}
      <aside
        className={`fixed top-[130px] left-0 h-screen z-50 flex flex-col p-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 transition-all duration-300 ease-in-out shadow-lg
          ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full'} md:static md:translate-x-0
          ${isCollapsed ? 'md:w-20' : 'md:w-64'}`}
      >
        {/* Sidebar Header with collapse button for desktop */}
        <div className=" flex justify-between items-center mb-6">
          <div
            className={`flex items-center space-x-2 transition-opacity duration-300 ${
              isCollapsed ? 'md:opacity-0 md:hidden' : ''
            }`}
          >
            <span className="text-xl font-bold text-gray-900 dark:text-white">BlogSphere</span>
          </div>

          {/* Collapse button for desktop sidebar */}
          <button
            onClick={toggleCollapse}
            className="hidden md:flex p-1 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>

        {/* User Profile - Full view */}
        <div
          className={`flex items-center space-x-4 mb-8 transition-opacity duration-300 ${
            isCollapsed && 'md:opacity-0 md:hidden'
          }`}
        >
          <div className="relative">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-10 h-10 rounded-full"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* User Profile - Collapsed view */}
        <div
          className={`hidden md:flex flex-col items-center mb-8 transition-opacity duration-300 ${
            !isCollapsed && 'md:hidden'
          }`}
        >
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-10 h-10 rounded-full"
          />
          <span className="mt-2 text-xs font-semibold text-gray-900 dark:text-white">JD</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1">
          <ul>
            {navItems.map((item, index) => (
              <li key={index} className="mb-2">
                <a
                  href={item.link}
                  className={`flex items-center p-3 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
                    ${item.name === 'Home' ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <item.icon size={20} className="mr-3" />
                  <span className={`transition-opacity duration-300 ${isCollapsed && 'md:opacity-0 md:hidden'}`}>
                    {item.name}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Section */}
        <div className="mt-auto">
          {/*  Logout */}
          <ul>
            <li>
              <a
                href="#"
                className="flex items-center p-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-100 dark:hover:bg-red-900 transition-colors duration-200"
              >
                <LogOut size={20} className="mr-3" />
                <span className={`transition-opacity duration-300 ${isCollapsed && 'md:opacity-0 md:hidden'}`}>
                  Log out
                </span>
              </a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 pt-20 transition-all duration-300 ease-in-out md:ml-4 md:pt-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Main Content Area</h1>
        <p className="mt-4 text-gray-700 dark:text-gray-300">
          This is where the main content of your application will go. The sidebar will
          adjust its visibility and size based on the screen size.
        </p>
      </main>
    </div>
  );
}
