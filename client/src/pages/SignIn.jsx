// Add this debug version of your SignIn component
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Navigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();
  const { login, loading, isAuthenticated } = useAuth();
  
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.dismiss();

    // ✅ DEBUG: Log what we're sending
    console.log("🔍 SignIn Form Data:", {
      emailOrUsername: formData.emailOrUsername,
      password: formData.password, // In production, don't log passwords!
    });

    // Basic validation
    if (!formData.emailOrUsername.trim()) {
      toast.error("Email or username is required");
      return;
    }

    if (!formData.password.trim()) {
      toast.error("Password is required");
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ DEBUG: Log before API call
      console.log("🚀 Making login request...");
      
      const result = await login({
        emailOrUsername: formData.emailOrUsername.trim(),
        password: formData.password,
      });

      // ✅ DEBUG: Log the response
      console.log("📥 Login Response:", result);

      if (result.success) {
        toast.success("Logged in successfully!");
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      } else {
        console.error("❌ Login failed:", result.error);
        toast.error(result.error || "Login failed");
      }

    } catch (error) {
      console.error('🔥 Login error:', error);
      toast.error('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-white dark:bg-slate-900 flex flex-col justify-center py-3 sm:px-6 lg:px-8 transition-colors duration-300">
      <ToastContainer />
      
      {/* Debug Info */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-4">
        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
          <h3 className="text-sm font-medium text-yellow-800">Debug Info:</h3>
          <p className="text-xs text-yellow-700">Check browser console for detailed logs</p>
          {/* <p className="text-xs text-yellow-700">API URL: {process.env.REACT_APP_API_URL || 'http://localhost:5000/api'}</p> */}
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Sign In
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email or Username *
              </label>
              <input
                id="emailOrUsername"
                name="emailOrUsername"
                type="text"
                value={formData.emailOrUsername}
                onChange={handleChange}
                disabled={loading || isSubmitting}
                placeholder="Enter your email or username"
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password *
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  disabled={loading || isSubmitting}
                  placeholder="Enter your password"
                  className="appearance-none block w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-gray-700 dark:text-white disabled:opacity-50"
                />
                <button
                  type="button"
                  disabled={loading || isSubmitting}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {showPassword ? "Hide" : "Show"}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || isSubmitting}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link to="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
