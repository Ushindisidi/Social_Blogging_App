// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import ThemeToggle from "./ThemeToggle";
// import logo from "../../src/assets/blog_logo.svg";
// import { FiMenu, FiX } from "react-icons/fi";

// export default function Header() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   return (
//     <header className="sticky top-0 z-10000 bg-white dark:bg-slate-800 shadow-lg px-4 sm:px-6 py-4 flex items-center justify-between h-16 transition-colors duration-300">
//       {/* Logo */}
//       <div className="flex items-center space-x-2">
//         <img src={logo} alt="Blog Logo" className="w-[150px] h-11" />
//       </div>

//       {/* Desktop Navigation */}
//       <div className="hidden md:flex items-center gap-4">
//         <ThemeToggle />
//         <Link
//           to="/signup"
//           className="bg-purple-800 dark:bg-purple-600 text-white px-4 py-2 rounded-md text-sm dark:hover:bg-purple-700 transition-colors"
//         >
//           Sign Up
//         </Link>
//         <Link
//           to="/sign-in"
//           className="border border-purple-800 dark:border-purple-600 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-md text-sm  transition-colors  hover:bg-purple-800 hover:text-white"
//         >
//           Log In
//         </Link>
//       </div>

//       {/* Mobile Hamburger Button */}
//       <button
//         className="md:hidden p-2 text-gray-700 dark:text-gray-300"
//         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//         aria-label="Toggle menu"
//       >
//         {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//       </button>

//       {/* Mobile Menu */}
//       {mobileMenuOpen && (
//         <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg py-4 px-6 flex flex-col items-center gap-4 transition-all duration-300">
//           <div className="w-full flex justify-center">
//             <ThemeToggle />
//           </div>
//           <Link
//             to="/signup"
//             className="w-full text-center bg-purple-800 dark:bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-900 dark:hover:bg-purple-700 transition-colors"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Sign Up
//           </Link>
//           <Link
//             to="/sign-in"
//             className="w-full text-center border border-purple-800 dark:border-purple-600 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-md text-sm hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
//             onClick={() => setMobileMenuOpen(false)}
//           >
//             Log In
//           </Link>
//         </div>
//       )}
//     </header>
//   );
// }

import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import logo from "../../src/assets/blog_logo.svg";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext"; // 👈 import auth hook

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // 👈 use context

  return (
    <header className="sticky top-0 z-10000 bg-white dark:bg-slate-800 shadow-lg px-4 sm:px-6 py-4 flex items-center justify-between h-16 transition-colors duration-300">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img src={logo} alt="Blog Logo" className="w-[150px] h-11" />
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
        <ThemeToggle />
        {user ? (
          <>
            <span className="text-sm text-gray-700 dark:text-white">
              Welcome, {user.username || "User"}
            </span>
            <button
              onClick={logout}
              className="border border-red-600 text-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-600 hover:text-white transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/signup"
              className="bg-purple-800 dark:bg-purple-600 text-white px-4 py-2 rounded-md text-sm dark:hover:bg-purple-700 transition-colors"
            >
              Sign Up
            </Link>
            <Link
              to="/sign-in"
              className="border border-purple-800 dark:border-purple-600 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-md text-sm hover:bg-purple-800 hover:text-white transition-colors"
            >
              Log In
            </Link>
          </>
        )}
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden p-2 text-gray-700 dark:text-gray-300"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-gray-800 shadow-lg py-4 px-6 flex flex-col items-center gap-4 transition-all duration-300">
          <ThemeToggle />
          {user ? (
            <>
              <span className="text-sm text-gray-700 dark:text-white">
                Welcome, {user.username || "User"}
              </span>
              <button
                onClick={() => {
                  logout();
                  setMobileMenuOpen(false);
                }}
                className="w-full text-center border border-red-600 text-red-600 px-4 py-2 rounded-md text-sm hover:bg-red-600 hover:text-white transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-purple-800 dark:bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-900 dark:hover:bg-purple-700 transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to="/sign-in"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center border border-purple-800 dark:border-purple-600 text-purple-800 dark:text-purple-300 px-4 py-2 rounded-md text-sm hover:bg-purple-50 dark:hover:bg-gray-700 transition-colors"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
