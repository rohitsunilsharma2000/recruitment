// utils/restClient.js
import axios from 'axios';
import { useState } from 'react';


let setModalVisible; // Variable to store the setter function for modal visibility


const restClient = axios.create({
  baseURL: 'http://localhost:8080', // Change to your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to set the modal trigger
export const setModalTrigger = (setModal) => {
  setModalVisible = setModal; // Store the state setter function passed from the component
};


// Add interceptors to handle token authentication
restClient.interceptors.request.use((config) => {
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

// Handle 401 errors (Unauthorized)
restClient.interceptors.response.use(
  (response) => response, // Return the response if no error
  async (error) => {
    if (error.response?.status === 401 && setModalVisible) {
      setModalVisible(true); // Show the modal by setting state when 401 occurs
    }
    return Promise.reject(error);
  }
);




// Login function
export const login = async (username, password) => {
  try {
    // Send login request
    const response = await restClient.post('/api/auth/login', {
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
    const response = await restClient.get('/user');
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};


export const fetchRolesHierarchy = async () => {
  try {
    const response = await restClient.get('/api/roles/hierarchy');
    return response.data; // Return the roles hierarchy
  } catch (error) {
    console.error('Error fetching roles hierarchy:', error);
    throw error;
  }
};


export const fetchRoles = async () => {
  try {
    const response = await restClient.get('/api/roles');

    return response.data; // Return the all roles 
  } catch (error) {
    console.error('Error fetching all roles :', error);
    throw error;
  }
};

export const fetchProfiles = async () => {
  try {
    const response = await restClient.get('/api/profiles');

    return response.data; // Return the all profiles 
  } catch (error) {
    console.error('Error fetching all profiles :', error);
    throw error;
  }
};




// Function to create a new role
export const createRole = async (roleData) => {
  try {
    const response = await restClient.post('/api/roles', roleData);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error creating role:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Function to create a new user
export const createUser = async (userData) => {
  try {
    const response = await restClient.post('/api/users', userData);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error creating user:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};


export const fetchUsers = async () => {
  try {
    const response = await restClient.get('/api/users');

    return response.data; // Return the all users 
  } catch (error) {
    console.error('Error fetching all users :', error);
    throw error;
  }
};


export const fetchProfile = async () => {
  try {
    const response = await restClient.get('/api/profiles');

    return response.data; // Return the all profiles 
  } catch (error) {
    console.error('Error fetching all profiles :', error);
    throw error;
  }
};




// Function to change password
export const changePassword = async (payload) => {
  try {
    const response = await restClient.post('/api/auth/set-password', payload);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error change password api call:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

// Fetch countries and positions using restClient
export const fetchCountries = async () => {
  try {
    const response = await restClient.get(
      "https://countriesnow.space/api/v0.1/countries/positions"
    );

    // Check for valid data in the response
    if (response.data && response.data.data) {
      return response.data.data; // Return the list of countries with positions
    } else {
      console.error("Invalid response structure:", response);
      return []; // Return an empty array in case of invalid response
    }
  } catch (error) {
    console.error("Error fetching countries and positions:", error);
    throw error; // Re-throw the error for caller handling
  }
};

// Function to create a new department
export const createDepartment = async (departmentData) => {
  try {
    const response = await restClient.post('/api/departments', departmentData);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error creating department:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};


export const fetchDepartments = async () => {
  try {
    const response = await restClient.get('/api/departments');
    return response.data;
  } catch (error) {
    console.error('Error fetching all departments :', error);
    throw error;
  }
};

export const fetchLeads = async () => {
  try {
    const response = await restClient.get('/api/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching all leads :', error);
    throw error;
  }
};




export const fetchJobTypes = async () => {
  try {
    const response = await restClient.get('/api/job-types');
    return response.data;
  } catch (error) {
    console.error('Error fetching all job-types :', error);
    throw error;
  }
};



export const fetchJobStatus = async () => {
  try {
    const response = await restClient.get('/api/job-status');
    return response.data;
  } catch (error) {
    console.error('Error fetching all job-status :', error);
    throw error;
  }
};


export const fetchIndustry = async () => {
  try {
    const response = await restClient.get('/api/industry');
    return response.data;
  } catch (error) {
    console.error('Error fetching all industry :', error);
    throw error;
  }
};



export const createJobOpening = async (payload) => {
  try {
    const response = await restClient.post('/api/job-openings', payload);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error creating role:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

//City (required)
export const fetchWorkExperience = async () => {
  try {
    const response = await restClient.get('/api/work-experience');
    return response.data;
  } catch (error) {
    console.error('Error fetching all work-experience :', error);
    throw error;
  }
};



export const createCandidate = async (payload) => {
  try {
    const response = await restClient.post('/api/candidates', payload);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error fetching all create-candidate :', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};




export const fetchJobApplicationsStatus = async () => {
  try {
    const response = await restClient.get('/api/job-applications/statuses');
    return response.data;
  } catch (error) {
    console.error('Error fetching all job-applications :', error);
    throw error;
  }
};


export const fetchJobResourceList = async () => {
  try {
    const response = await restClient.get('/api/all-job-references');
    return response.data;
  } catch (error) {
    console.error('Error in fetch job resource list :', error);
    throw error;
  }
};


export const fetchAllCandidates = async () => {
  try {
    const response = await restClient.get('/api/candidates');
    return response.data;
  } catch (error) {
    console.error('Error in  fetch All Candidates  :', error);
    throw error;
  }
};

export const fetchAllQuestion = async () => {
  try {
    const response = await restClient.get('/api/question-bank');
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error; // Throw the error for further handling
  }
};

export const fetchQuestionsByCompetency = async (competencyType) => {
  try {
    const response = await restClient.get(`/api/question-bank/by-competency`, {
      params: { competencyType }, // Pass competencyType as a query param
    });
    return response.data; // Return the response data
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw error; // Throw the error for further handling
  }
};


export const evaluateCandidate = async (candidateId, payload) => {
  try {
    const response = await restClient.post(`/api/candidate-evaluations/${candidateId}`, payload);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error evaluating candidate:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};



export const createBulkJobApplications = async (payload) => {
  try {
    const response = await restClient.post('/api/job-applications', payload);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error creating bulk job applications:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};



export const scheduleInterview = async (payload) => {
  try {
    const response = await restClient.post('/api/interviews', payload);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error creating interview:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};



export const updateInterview = async (interviewId, payload) => {
  try {
    const response = await restClient.put(`/api/interviews/${interviewId}`, payload);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error updating interview:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

export const deleteInterview = async (interviewId) => {
  try {
    const response = await restClient.delete(`/api/interviews/${interviewId}`);
    return response.data; // Return the response data if the request is successful
  } catch (error) {
    console.error('Error deleting interview:', error);
    throw error; // Re-throw the error to be handled by the caller
  }
};



export const fetchAllJobs = async () => {
  try {
    const response = await restClient.get('/api/job-openings');
    return response.data;
  } catch (error) {
    console.error('Error in  fetch All jobs  :', error);
    throw error;
  }
};


export const fetchJobOpeningById = async (jobId) => {
  try {
    const response = await restClient.get(`/api/job-openings/${jobId}`);
    return response.data;
  } catch (error) {
    console.error(`Error in fetching job opening with ID ${jobId}:`, error);
    throw error;
  }
};

export const fetchCandidateDetailsById = async (id) => {
  try {
    const response = await restClient.get(`/api/candidates/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error in fetching candidates with ID ${id}:`, error);
    throw error;
  }
};


export default restClient;