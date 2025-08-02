import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaXTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa6";
import { Link } from "react-router-dom";
import logo from "../../src/assets/blog_logo.svg";

export default function Footer() {
  return (
    <footer className=" inset-x-0 bottom-0 bg-white dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 px-6 py-8">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Toto Logo" className="w-[150px] h-11" />
        </div>

        {/* Navigation Links */}
        <nav className="flex gap-6 text-sm font-medium text-purple-800 dark:text-gray-200">
          <Link to="/">Home Page</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/posts">Blog Posts</Link>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-4 text-purple-800 dark:text-white text-xl">
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaXTwitter />
          </a>
          <a href="#">
            <FaLinkedinIn />
          </a>
          <a href="#">
            <FaYoutube />
          </a>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-300 dark:border-gray-700" />

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
        <p>© 2025 BlogSphere. All rights reserved.</p>
        <div className="flex gap-4 underline">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Use</a>
          <a href="#">Cookie Policy</a>
        </div>
      </div>
    </footer>
  );
}
