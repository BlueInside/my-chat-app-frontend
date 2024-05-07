import { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const AuthContext = createContext({});

function useAuth() {
  return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const authenticateUser = async () => {
      try {
        const url = 'http://localhost:3000/authenticate/verify-token';
        const token = localStorage.getItem('token');
        if (!token) {
          return;
        }

        const response = await axios.get(url, {
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          const userData = { ...response.data.user, token };
          setUser(userData);
        }
      } catch (error) {
        if (error.code === 'ERR_CANCELED') return;
        console.error('Error during validation:', error.message);
      }
    };
    authenticateUser();

    return () => {
      source.cancel('Cancelling in cleanup');
    };
  }, []);

  const login = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('token');
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node,
};

export { AuthContext, AuthProvider, useAuth };
