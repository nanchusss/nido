import { createContext, useContext, useEffect, useState } from 'react';
import { apiRequest } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user;

  // 🔄 Validar sesión al cargar la app
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      setLoading(false);
      return;
    }

    const loadUser = async () => {
      try {
        const me = await apiRequest('/auth/me');
        setUser(me);
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // 🔐 Login normal
  const login = async ({ email, password }) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: { email, password },
    });

    localStorage.setItem('token', data.token);

    const me = await apiRequest('/auth/me');
    setUser(me);
  };

  // 🔐 Login con token (verify)
  const loginWithToken = async (token) => {
    localStorage.setItem('token', token);
    const me = await apiRequest('/auth/me');
    setUser(me);
  };

  // 🚪 Logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        loginWithToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
