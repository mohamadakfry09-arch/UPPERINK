import React, { createContext, useContext, useState, useEffect } from 'react';
import { ADMIN_TOKEN_KEY } from '../config/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminInfo, setAdminInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cek token di localStorage saat init
    const token = localStorage.getItem(ADMIN_TOKEN_KEY);
    if (token) {
      try {
        const decoded = JSON.parse(atob(token));
        if (decoded.exp > Date.now()) {
          setIsAuthenticated(true);
          setAdminInfo(decoded);
        } else {
          localStorage.removeItem(ADMIN_TOKEN_KEY);
        }
      } catch {
        localStorage.removeItem(ADMIN_TOKEN_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'admin@hypostudio.id';
    const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || 'Admin@2024!';

    if (email === adminEmail && password === adminPassword) {
      const payload = {
        email,
        role: 'admin',
        exp: Date.now() + 24 * 60 * 60 * 1000, // 24 jam
      };
      const token = btoa(JSON.stringify(payload));
      localStorage.setItem(ADMIN_TOKEN_KEY, token);
      setIsAuthenticated(true);
      setAdminInfo(payload);
      return { success: true };
    }
    return { success: false, message: 'Email atau password salah' };
  };

  const logout = () => {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    setIsAuthenticated(false);
    setAdminInfo(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, adminInfo, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export default AuthContext;
