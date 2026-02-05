import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// --- REGISTER (NEW) ---
export const registerUser = async (username, email, password, role) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, {
      username,
      email,
      password,
      role
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server Error" };
  }
};

// --- LOGIN ---
export const loginUser = async (email, password) => {
  try {
      console.log("Attempting Login to:", `${API_URL}/auth/login`);
    const response = await axios.post(`${API_URL}/auth/login`, {
  
      email,
      password,
    });
    
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
    }

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : { message: "Server Error" };
  }
};

// --- LOGOUT ---
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};

// --- GET CURRENT USER ---
export const getCurrentUser = () => {
  return {
    token: localStorage.getItem('token'),
    role: localStorage.getItem('role')
  };
};