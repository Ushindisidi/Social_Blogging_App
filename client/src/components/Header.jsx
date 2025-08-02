import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

import logo from '../../src/assets/blog_logo.svg'

export default function Header() {
    // const [darkMode, setDarkMode] = React.useState(false);
  
    // const toggleDarkMode = () => {
    //   setDarkMode(!darkMode);
    //   document.documentElement.classList.toggle("dark");
    // };
  
  return (
    <header className="sticky top-0 z-10 bg-white shadow px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Toto Logo" className="w-[150px] h-11" />
        </div>
        
             {/* Right side */}
        <div className="flex items-center gap-4">
        <ThemeToggle/>
        {/* Auth buttons */}
        <Link
          to="/signup"
          className="bg-purple-800 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-900"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="border border-purple-800 text-purple-800 px-4 py-2 rounded-md text-sm hover:bg-purple-50"
        >
          Log In
        </Link>
      </div>
    </header>
  )
}
