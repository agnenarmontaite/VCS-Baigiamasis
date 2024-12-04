import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const token = localStorage.getItem('token');
    return !!token;
  });

  const [user, setUser] = useState(() => {
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  });

  const value = {
    isLoggedIn,
    user,
    login: (token, userData, showWelcome = true) => {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      setIsLoggedIn(true);
      setUser(userData);
      if (showWelcome) {
        toast.success(`Welcome back, ${userData.name}!`);
      }
    },
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      setIsLoggedIn(false);
      setUser(null);
      toast.warning('Logout successful!');
      navigate('/');
    },
    register: () => {
      toast.success('Registration successful! Please login.');
      return true;
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
