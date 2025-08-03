// import axios from 'axios';

// // Create axios instance with base configuration
// const api = axios.create({
//   baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
//   timeout: 10000, // 10 seconds
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor (runs before every request)
// api.interceptors.request.use(
//   (config) => {
//     // Add auth token if it exists
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     console.log('Making request:', config.method.toUpperCase(), config.url);
//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor (runs after every response)
// api.interceptors.response.use(
//   (response) => {
//     console.log('Response received:', response.status, response.config.url);
//     return response;
//   },
//   (error) => {
//     console.error('Response error:', error.response?.status, error.response?.data);
    
//     // Handle common errors
//     if (error.response?.status === 401) {
//       // Unauthorized - clear token and redirect to login
//       localStorage.removeItem('authToken');
//       window.location.href = '/sign-in';
//     }
    
//     return Promise.reject(error);
//   }
// );

// // Auth API calls
// export const authAPI = {
//   // Sign up user
//   signUp: async (userData) => {
//     try {
//       const response = await api.post('/auth/register', userData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { message: 'Registration failed' };
//     }
//   },

//   // Sign in user
//   signIn: async (credentials) => {
//     try {
//       const response = await api.post('/auth/login', credentials);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { message: 'Login failed' };
//     }
//   },

//   // Get current user profile
//   getProfile: async () => {
//     try {
//       const response = await api.get('/auth/profile');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { message: 'Failed to get profile' };
//     }
//   },

//   // Update user profile
//   updateProfile: async (updateData) => {
//     try {
//       const response = await api.put('/auth/profile', updateData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { message: 'Failed to update profile' };
//     }
//   },

//   // Logout (if you have a logout endpoint)
//   logout: async () => {
//     try {
//       const response = await api.post('/auth/logout');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { message: 'Logout failed' };
//     }
//   }
// };

// // Generic API calls
// export const apiCall = {
//   get: (url, config = {}) => api.get(url, config),
//   post: (url, data, config = {}) => api.post(url, data, config),
//   put: (url, data, config = {}) => api.put(url, data, config),
//   delete: (url, config = {}) => api.delete(url, config),
//   patch: (url, data, config = {}) => api.patch(url, data, config),
// };

// export default api;








// src/services/api.js
// import axios from 'axios';

// // Create axios instance with base configuration
// const api = axios.create({
//   baseURL: 'http://localhost:5000/api', // Direct URL for development
//   timeout: 10000, // 10 seconds
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// // Request interceptor (runs before every request)
// api.interceptors.request.use(
//   (config) => {
//     // Add auth token if it exists
//     const token = localStorage.getItem('authToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
    
//     console.log('Making request:', config.method.toUpperCase(), config.url);
//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Response interceptor (runs after every response)
// api.interceptors.response.use(
//   (response) => {
//     console.log('Response received:', response.status, response.config.url);
//     return response;
//   },
//   (error) => {
//     console.error('Response error:', error.response?.status, error.response?.data);
    
//     // Handle common errors
//     if (error.response?.status === 401) {
//       // Unauthorized - clear token and redirect to login
//       localStorage.removeItem('authToken');
//       window.location.href = '/sign-in';
//     }
    
//     return Promise.reject(error);
//   }
// );

// // Auth API calls
// export const authAPI = {
//   // Sign up user
//   signUp: async (userData) => {
//     try {
//       const response = await api.post('/auth/register', userData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { message: 'Registration failed' };
//     }
//   },

//   // Sign in user
//   signIn: async (credentials) => {
//     try {
//       const response = await api.post('/auth/login', credentials);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { message: 'Login failed' };
//     }
//   },

//   // Get current user profile
//   getProfile: async () => {
//     try {
//       const response = await api.get('/auth/profile');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { message: 'Failed to get profile' };
//     }
//   },

//   // Update user profile
//   updateProfile: async (updateData) => {
//     try {
//       const response = await api.put('/auth/profile', updateData);
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { message: 'Failed to update profile' };
//     }
//   },

//   // Logout (if you have a logout endpoint)
//   logout: async () => {
//     try {
//       const response = await api.post('/auth/logout');
//       return response.data;
//     } catch (error) {
//       throw error.response?.data || { message: 'Logout failed' };
//     }
//   }
// };

// // Generic API calls
// export const apiCall = {
//   get: (url, config = {}) => api.get(url, config),
//   post: (url, data, config = {}) => api.post(url, data, config),
//   put: (url, data, config = {}) => api.put(url, data, config),
//   delete: (url, config = {}) => api.delete(url, config),
//   patch: (url, data, config = {}) => api.patch(url, data, config),
// };

// export default api;


// src/services/api.js
import axios from 'axios';

// Configuration - Updated for your backend
const API_CONFIG = {
  baseURL: 'http://localhost:8080', // Your backend port
  timeout: 10000,
  endpoints: {
    register: '/api/auth/signup',       // Matches your signup function
    login: '/api/auth/login',           // Matches your login function
    profile: '/api/auth/check-auth',    // Matches your checkAuth function
    updateProfile: '/api/auth/profile', // You'll need to add this endpoint
    logout: '/api/auth/logout'          // Matches your logout function
  }
};

// Create axios instance
const api = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Include cookies if your backend uses them
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`🚀 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ API Error:`, error.response?.status, error.response?.data || error.message);
    
    // Handle 401 errors (unauthorized)
    if (error.response?.status === 401) {
      // Clear any stored data and redirect to login
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      localStorage.removeItem('user');
      
      // Redirect to login if not already there
      if (!window.location.pathname.includes('/sign-in')) {
        window.location.href = '/sign-in';
      }
    }
    
    return Promise.reject(error);
  }
);

// Helper function to handle API responses
const handleApiResponse = (response) => {
  // Different backends return data differently
  // This handles common response formats
  if (response.data) {
    // Most common format
    return response.data;
  }
  return response;
};

// Helper function to handle API errors
const handleApiError = (error) => {
  if (error.response?.data) {
    // Backend returned an error response
    const errorData = error.response.data;
    
    // Handle different error response formats
    if (errorData.message) {
      throw { message: errorData.message };
    } else if (errorData.error) {
      throw { message: errorData.error };
    } else if (typeof errorData === 'string') {
      throw { message: errorData };
    } else {
      throw { message: 'An error occurred' };
    }
  } else if (error.message) {
    // Network or other error
    throw { message: error.message };
  } else {
    throw { message: 'An unexpected error occurred' };
  }
};

// Auth API functions
export const authAPI = {
  // Register new user
  signUp: async (userData) => {
    try {
      // Your backend expects: username, email, password
      const requestData = {
        username: userData.name, // Convert 'name' to 'username' for your backend
        email: userData.email,
        password: userData.password
      };
      
      const response = await api.post(API_CONFIG.endpoints.register, requestData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Login user
  signIn: async (credentials) => {
    try {
      // Your backend expects: emailOrUsername, password
      const requestData = {
        emailOrUsername: credentials.email, // Can be email or username
        password: credentials.password
      };
      
      const response = await api.post(API_CONFIG.endpoints.login, requestData);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Get user profile (check auth)
  getProfile: async () => {
    try {
      const response = await api.get(API_CONFIG.endpoints.profile);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Update user profile (you'll need to implement this endpoint)
  updateProfile: async (updateData) => {
    try {
      const response = await api.put(API_CONFIG.endpoints.updateProfile, updateData);
      return handleApiResponse(response);
    } catch (error) {
      // If endpoint doesn't exist yet, just return success for now
      console.warn('Update profile endpoint not implemented yet');
      return { success: true, message: 'Profile update not implemented yet' };
    }
  },

  // Logout user
  logout: async () => {
    try {
      const response = await api.post(API_CONFIG.endpoints.logout);
      return handleApiResponse(response);
    } catch (error) {
      // Don't throw error for logout - it should work even if API call fails
      console.warn('Logout API call failed:', error);
      return { success: true, message: 'Logged out locally' };
    }
  },

  // Forgot password
  forgotPassword: async (emailOrUsername) => {
    try {
      const response = await api.post('/api/auth/forgot-password', { emailOrUsername });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  // Reset password
  resetPassword: async (token, newPassword) => {
    try {
      const response = await api.post(`/api/auth/reset-password/${token}`, { newPassword });
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Generic API functions
export const apiCall = {
  get: async (url, config = {}) => {
    try {
      const response = await api.get(url, config);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  post: async (url, data = {}, config = {}) => {
    try {
      const response = await api.post(url, data, config);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  put: async (url, data = {}, config = {}) => {
    try {
      const response = await api.put(url, data, config);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  delete: async (url, config = {}) => {
    try {
      const response = await api.delete(url, config);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  },

  patch: async (url, data = {}, config = {}) => {
    try {
      const response = await api.patch(url, data, config);
      return handleApiResponse(response);
    } catch (error) {
      handleApiError(error);
    }
  }
};

// Test function to check API connection
export const testConnection = async () => {
  try {
    // Try to hit a simple endpoint to test connection
    const response = await api.get('/health'); // or '/api/health' or whatever health check you have
    console.log('✅ API Connection successful:', response);
    return true;
  } catch (error) {
    console.error('❌ API Connection failed:', error);
    return false;
  }
};

export default api;
