// import React,{ createContext, useContext, useState, useEffect } from "react";

// // Create context
// const AuthContext = createContext();

// // Custom hook for ease of use
// export const useAuth = () => useContext(AuthContext);

// // Provider
// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null); // null means not logged in
//   const [loading, setLoading] = useState(true); // for checking auth status on app load

//   // Simulate loading user from localStorage or API on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem("user");
//     if (storedUser) {
//       setUser(JSON.parse(storedUser));
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData) => {
//     setUser(userData);
//     localStorage.setItem("user", JSON.stringify(userData));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };





// context/AuthContext.jsx
// import React,{ createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const login = (email) => {
//     const mockUser = { email, username: email.split("@")[0] };
//     setUser(mockUser);
//     localStorage.setItem("user", JSON.stringify(mockUser));
//   };

//   const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => useContext(AuthContext);





// context/AuthContext.jsx
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { authAPI } from "../src/utils/api"; // Adjust path as needed
// import { toast } from "react-toastify";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Loading state for initial auth check
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   // Check if user is authenticated on app load
//   useEffect(() => {
//     const initializeAuth = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         if (token) {
//           // Verify token and get user data from backend
//           const userData = await authAPI.getProfile();
//           setUser(userData.user);
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         // Token is invalid or expired
//         console.error("Auth initialization error:", error);
//         localStorage.removeItem("authToken");
//         localStorage.removeItem("user");
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeAuth();
//   }, []);

//   // Register new user
//   const register = async (userData) => {
//     try {
//       setLoading(true);
//       const response = await authAPI.signUp(userData);
      
//       // Store token and user data
//       if (response.token) {
//         localStorage.setItem("authToken", response.token);
//       }
      
//       const userInfo = response.user || {
//         id: response.id,
//         name: response.name,
//         email: response.email,
//         username: response.username || response.email.split("@")[0]
//       };
      
//       setUser(userInfo);
//       setIsAuthenticated(true);
//       localStorage.setItem("user", JSON.stringify(userInfo));
      
//       return { success: true, user: userInfo };
//     } catch (error) {
//       console.error("Registration error:", error);
//       return { 
//         success: false, 
//         error: error.message || "Registration failed" 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Login existing user
//   const login = async (credentials) => {
//     try {
//       setLoading(true);
//       const response = await authAPI.signIn(credentials);
      
//       // Store token and user data
//       if (response.token) {
//         localStorage.setItem("authToken", response.token);
//       }
      
//       const userInfo = response.user || {
//         id: response.id,
//         name: response.name,
//         email: response.email,
//         username: response.username || response.email.split("@")[0]
//       };
      
//       setUser(userInfo);
//       setIsAuthenticated(true);
//       localStorage.setItem("user", JSON.stringify(userInfo));
      
//       return { success: true, user: userInfo };
//     } catch (error) {
//       console.error("Login error:", error);
//       return { 
//         success: false, 
//         error: error.message || "Login failed" 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Logout user
//   const logout = async () => {
//     try {
//       // Call logout endpoint if you have one (optional)
//       try {
//         await authAPI.logout();
//       } catch (error) {
//         // Logout endpoint might not exist or might fail, continue anyway
//         console.warn("Logout API call failed:", error);
//       }
//     } finally {
//       // Clear local state regardless of API call result
//       setUser(null);
//       setIsAuthenticated(false);
//       localStorage.removeItem("authToken");
//       localStorage.removeItem("user");
//       toast.success("Logged out successfully");
//     }
//   };

//   // Update user profile
//   const updateProfile = async (updateData) => {
//     try {
//       setLoading(true);
//       const response = await authAPI.updateProfile(updateData);
      
//       const updatedUser = { ...user, ...response.user };
//       setUser(updatedUser);
//       localStorage.setItem("user", JSON.stringify(updatedUser));
      
//       return { success: true, user: updatedUser };
//     } catch (error) {
//       console.error("Profile update error:", error);
//       return { 
//         success: false, 
//         error: error.message || "Profile update failed" 
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Refresh user data from backend
//   const refreshUser = async () => {
//     try {
//       if (!isAuthenticated) return;
      
//       const userData = await authAPI.getProfile();
//       setUser(userData.user);
//       localStorage.setItem("user", JSON.stringify(userData.user));
      
//       return { success: true, user: userData.user };
//     } catch (error) {
//       console.error("Refresh user error:", error);
//       // If refresh fails, might mean token is invalid
//       logout();
//       return { success: false, error: error.message };
//     }
//   };

//   const value = {
//     // State
//     user,
//     loading,
//     isAuthenticated,
    
//     // Methods
//     register,
//     login,
//     logout,
//     updateProfile,
//     refreshUser,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };


// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../src/utils/api"; // Adjust path as needed
import { toast } from "react-toastify";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state for initial auth check
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Check if user data exists in localStorage
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
          // Try to verify with backend
          try {
            const userData = await authAPI.getProfile();
            if (userData.success) {
              setUser(userData.user);
              setIsAuthenticated(true);
            } else {
              // Clear invalid data
              localStorage.removeItem("user");
            }
          } catch (error) {
            // Backend verification failed, but keep local data for now
            console.warn("Auth verification failed, using local data:", error);
            setUser(JSON.parse(savedUser));
            setIsAuthenticated(true);
          }
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Register new user
  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.signUp(userData);
      
      if (response.success) {
        // Your backend sends user data in response.user
        const userInfo = response.user;
        
        setUser(userInfo);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userInfo));
        
        return { success: true, user: userInfo };
      } else {
        return { success: false, error: response.message || "Registration failed" };
      }
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        error: error.message || "Registration failed" 
      };
    } finally {
      setLoading(false);
    }
  };

  // Login existing user
  const login = async (credentials) => {
    try {
      setLoading(true);
      const response = await authAPI.signIn(credentials);
      
      if (response.success) {
        // Your backend sends user data in response.user
        const userInfo = response.user;
        
        setUser(userInfo);
        setIsAuthenticated(true);
        localStorage.setItem("user", JSON.stringify(userInfo));
        
        return { success: true, user: userInfo };
      } else {
        return { success: false, error: response.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: error.message || "Login failed" 
      };
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      // Call logout endpoint
      await authAPI.logout();
    } finally {
      // Clear local state regardless of API call result
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("user");
      // Clear the httpOnly cookie by making the logout call
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      toast.success("Logged out successfully");
    }
  };

  // Update user profile
  const updateProfile = async (updateData) => {
    try {
      setLoading(true);
      const response = await authAPI.updateProfile(updateData);
      
      const updatedUser = { ...user, ...response.user };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      return { success: true, user: updatedUser };
    } catch (error) {
      console.error("Profile update error:", error);
      return { 
        success: false, 
        error: error.message || "Profile update failed" 
      };
    } finally {
      setLoading(false);
    }
  };

  // Refresh user data from backend
  const refreshUser = async () => {
    try {
      if (!isAuthenticated) return;
      
      const userData = await authAPI.getProfile();
      setUser(userData.user);
      localStorage.setItem("user", JSON.stringify(userData.user));
      
      return { success: true, user: userData.user };
    } catch (error) {
      console.error("Refresh user error:", error);
      // If refresh fails, might mean token is invalid
      logout();
      return { success: false, error: error.message };
    }
  };

  const value = {
    // State
    user,
    loading,
    isAuthenticated,
    
    // Methods
    register,
    login,
    logout,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
