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
      console.error('Login error:', error.response?.data || error.message);
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


export const fetchRolesHierarchy = async () => {
  try {
    const response = await apiClient.get('/api/roles/hierarchy');
    return response.data; // Return the roles hierarchy
  } catch (error) {
    console.error('Error fetching roles hierarchy:', error);
    throw error;
  }
};


export const fetchRoles = async () => {
  try {
    const response = await apiClient.get('/api/roles');

    return response.data; // Return the all roles 
  } catch (error) {
    console.error('Error fetching all roles :', error);
    throw error;
  }
};

export const fetchProfiles = async () => {
  try {
    const response = await apiClient.get('/api/profiles');

    return response.data; // Return the all profiles 
  } catch (error) {
    console.error('Error fetching all profiles :', error);
    throw error;
  }
};




// Function to create a new role
export const createRole = async (roleData) => {
  try {
    const response = await apiClient.post('/api/roles', roleData);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error creating role:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};


export default apiClient;
