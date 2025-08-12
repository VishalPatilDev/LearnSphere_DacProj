import React from 'react';
import authService from '../services/authService';

const RoleBasedComponent = ({ roles = [], children, fallback = null }) => {
  const userRole = authService.getUserRole();
  
  // If no roles specified, show to all authenticated users
  if (roles.length === 0) {
    return authService.isAuthenticated() ? children : fallback;
  }

  // Check if user has any of the required roles
  const hasRequiredRole = roles.some(role => authService.hasRole(role));
  
  return hasRequiredRole ? children : fallback;
};

export default RoleBasedComponent;
