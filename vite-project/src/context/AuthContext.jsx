import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthContext: Mounting, checking localStorage...');
    const token = localStorage.getItem('access');
    
    if (!token) {
      console.log('AuthContext: No token found, setting loading to false.');
      setLoading(false);
      setUser(null);
      return;
    }

    console.log('AuthContext: Token found, attempting /auth/me/ request...');
    api.get('auth/me/')
      .then(res => {
        console.log('AuthContext: /auth/me/ success:', res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.error('AuthContext: /auth/me/ failed:', err.message, err.response?.data);
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setUser(null);
      })
      .finally(() => {
        console.log('AuthContext: Finalizing loading state.');
        setLoading(false);
      });
  }, []);

  const login = async (username, password) => {
    const response = await api.post('auth/login/', { username, password });
    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    const userRes = await api.get('auth/me/');
    setUser(userRes.data);
  };

  const register = async (data) => {
    await api.post('auth/register/', data);
  };

  const logout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
