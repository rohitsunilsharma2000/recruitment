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
    // Send login request
    const response = await apiClient.post('/api/auth/login', {
      username,
      password,
    });

    // Destructure the response to get token and user details
    const { token, ...userData } = response.data;

    // Ensure token exists in the response
    if (!token) {
      console.error('Login failed: Token not received');
      throw new Error('Authentication failed: Token not received');
    }

    // Save the token to localStorage for client-side access
    localStorage.setItem('token', token);

    // Save user data to localStorage for future use
    localStorage.setItem('user', JSON.stringify(userData));

    // Log success message for debugging
    console.log('Login successful:', userData);

    // Return full response for further processing if needed
    return response.data;
  } catch (error) {
    console.error('Error during login:', error.response?.data || error.message);
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

// Function to create a new user
export const createUser = async (userData) => {
  try {
    const response = await apiClient.post('/api/users', userData);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};


export const fetchUsers = async () => {
  try {
    const response = await apiClient.get('/api/users');

    return response.data; // Return the all users 
  } catch (error) {
    console.error('Error fetching all users :', error);
    throw error;
  }
};


export const fetchProfile = async () => {
  try {
    const response = await apiClient.get('/api/profiles');

    return response.data; // Return the all profiles 
  } catch (error) {
    console.error('Error fetching all profiles :', error);
    throw error;
  }
};

export default apiClient;