import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./Header";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
        <div>
            <main className="flex-1">
            <Outlet />
            </main>
        </div>
      <Footer />
    </div>
  );
};

export default Layout;

