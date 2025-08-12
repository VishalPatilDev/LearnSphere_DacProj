import React from 'react';
import { Navigate } from 'react-router-dom';
import authService from '../services/authService';

const ProtectedRoute = ({ children, requiredRole = null }) => {
  // Check if user is authenticated
  if (!authService.isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (requiredRole && !authService.hasRole(requiredRole)) {
    // Redirect based on user's actual role
    const userRole = authService.getUserRole();
    if (userRole === 'ADMIN') {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/courses" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
