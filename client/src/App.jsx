import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Import Pages
import Login from './pages/Login';
import Register from './pages/Register';
import DoctorDashboard from './pages/DoctorDashboard';
import PatientDashboard from './pages/PatientDashboard';
import Navbar from './components/Navbar';           // 👈 Added Navbar
import ProtectedRoute from './components/ProtectedRoute'; // 👈 Added Security

// Import Context
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-100">
          {/* Navbar appears on all pages */}
          <Navbar /> 

          <Routes>
            {/* --- PUBLIC ROUTES --- */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* --- PROTECTED ROUTES --- */}
            
            {/* 1. Patient Route (Matches '/patient' from Login.jsx) */}
            <Route 
              path="/patient" 
              element={
                <ProtectedRoute allowedRole="patient">
                  <PatientDashboard />
                </ProtectedRoute>
              } 
            />

            {/* 2. Doctor Route (Matches '/doctor' from Login.jsx) */}
            <Route 
              path="/doctor" 
              element={
                <ProtectedRoute allowedRole="doctor">
                  <DoctorDashboard />
                </ProtectedRoute>
              } 
            />

            {/* Default: Redirect any unknown URL to Login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;