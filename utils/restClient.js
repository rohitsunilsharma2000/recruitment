// utils/restClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080', // Change to your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptors to handle token authentication
apiClient.interceptors.request.use((config) => {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  if (token) {
    // Add token to headers if available
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Login function
export const login = async (username, password) => {
  try {
    const response = await apiClient.post('/api/auth/login', {
      username,
      password,
    });
    // Save token and other relevant info to localStorage
    const { token } = response.data;
    // localStorage.setItem('token', token);
    // Ensure token is set in localStorage
    if (token) {
      localStorage.setItem('token', token);
      // Store token in cookies for server-side access

    } else {
      throw new Error('Token not received');
    }
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
};

// Fetch user data (example of another API call)
export const fetchUserData = async () => {
  try {
    const response = await apiClient.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export default apiClient;
