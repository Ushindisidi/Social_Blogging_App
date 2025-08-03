import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";
import ForgotPassword from "./pages/ForgetPassword";
import CreatePost from "./pages/CreatePost";
import ProtectedRoute from "./components/ProtectedRoutes";

export default function App() {
  return (
    <BrowserRouter>
      {/* <ScrollToTop /> */}
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        } />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forget-password" element={<ForgotPassword />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
