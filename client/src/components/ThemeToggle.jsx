import React, { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeToggle = () => {
  const { toggleTheme, isDarkMode } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 transition-colors rounded-full hover:bg-amber-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white"
    >
      {isDarkMode ? (
        <FaSun className="w-5 h-5 text-white" />
      ) : (
        <FaMoon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;
