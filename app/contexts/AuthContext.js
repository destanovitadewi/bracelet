// /app/contexts/AuthContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // Function to save user to memory and indicate logged in status
  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    // Store a simple flag to indicate user is logged in
    // Note: We're not storing sensitive data, just a login flag
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('isLoggedIn', 'true');
      sessionStorage.setItem('userData', JSON.stringify(userData));
    }
  };

  // Function to logout user
  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('userData');
    }
  };

  // Check if user is logged in on component mount
  useEffect(() => {
    const checkAuthStatus = () => {
      if (typeof window !== 'undefined') {
        const savedLoginStatus = sessionStorage.getItem('isLoggedIn');
        const savedUserData = sessionStorage.getItem('userData');
        
        if (savedLoginStatus === 'true' && savedUserData) {
          try {
            const userData = JSON.parse(savedUserData);
            setUser(userData);
            setIsLoggedIn(true);
          } catch (error) {
            console.error('Error parsing saved user data:', error);
            // Clear invalid data
            sessionStorage.removeItem('isLoggedIn');
            sessionStorage.removeItem('userData');
          }
        }
      }
      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  const value = {
    user,
    isLoggedIn,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}