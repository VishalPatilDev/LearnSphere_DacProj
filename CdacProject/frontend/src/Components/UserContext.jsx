import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: '',
    id: '',
    email: '',
    role: ''
  });

  useEffect(() => {
    // Initialize user from localStorage on app start
    if (authService.isAuthenticated()) {
      const name = localStorage.getItem('name') || '';
      const id = localStorage.getItem('userId') || '';
      const email = localStorage.getItem('email') || '';
      const role = localStorage.getItem('role') || '';
      
      setUser({ name, id, email, role });
    }
  }, []);

  const setUserInfo = (userInfo) => {
    setUser(userInfo);
  };

  return (
    <UserContext.Provider value={{ user, setUser: setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};