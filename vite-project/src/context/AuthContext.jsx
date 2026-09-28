import { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (token) {
      api.get('auth/me/')
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem('access');
          localStorage.removeItem('refresh');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
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
