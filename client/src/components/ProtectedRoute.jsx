// prevents patients from seeing the doctor dashboard and viceversa

import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import React from 'react';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  // 1. Wait for the check to finish (don't kick them out while loading)
  if (loading) return <p>Loading...</p>;

  // 2. If not logged in -> Go to Login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // 3. If logged in but WRONG role (e.g. Patient trying to see Doctor page)
  if (allowedRole && user.role !== allowedRole) {
    alert("Access Denied: You are not authorized to view this page.");
    return <Navigate to="/login" replace />; // Or redirect to their own dashboard
  }

  // 4. If all good -> Show the page
  return children;
};

export default ProtectedRoute;