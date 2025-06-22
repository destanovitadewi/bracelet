// contexts/AdminAuthContext.js
'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const loginAdmin = (adminData) => {
    setAdminUser(adminData);
    setIsLoggedIn(true);
    sessionStorage.setItem('adminData', JSON.stringify(adminData));
    sessionStorage.setItem('isAdminLoggedIn', 'true');
  };

  const logoutAdmin = () => {
    setAdminUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('adminData');
    sessionStorage.removeItem('isAdminLoggedIn');
  };

  useEffect(() => {
    const stored = sessionStorage.getItem('adminData');
    const logged = sessionStorage.getItem('isAdminLoggedIn') === 'true';
    if (stored && logged) {
      setAdminUser(JSON.parse(stored));
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ adminUser, isLoggedIn, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) throw new Error('useAdminAuth must be used within AdminAuthProvider');
  return context;
}
