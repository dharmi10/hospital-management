// connecting to backend 
// function to fetch live queue data 
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Helper to get the token from storage
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return { headers: { Authorization: `Bearer ${token}` } };
};

// --- 1. GET QUEUE (For Doctor) ---
export const getQueue = async () => {
  const response = await axios.get(`${API_URL}/queue`, getAuthHeader());
  return response.data;
};

// --- 2. UPDATE STATUS (Mark Complete) ---
export const updateTicketStatus = async (id, status) => {
  const response = await axios.put(
    `${API_URL}/queue/${id}`, 
    { status }, 
    getAuthHeader()
  );
  return response.data;
};

// --- 3. CREATE TICKET (For Patient) ---
export const createTicket = async (symptoms) => {
  const response = await axios.post(
    `${API_URL}/patient/create`, 
    { symptoms, appointmentDate: new Date() }, 
    getAuthHeader()
  );
  return response.data;
};

// --- 4. GET HISTORY (For Patient) ---
export const getPatientHistory = async () => {
  const response = await axios.get(
    `${API_URL}/patient/history`, 
    getAuthHeader()
  );
  return response.data;
};