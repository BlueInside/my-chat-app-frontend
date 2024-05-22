import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { AuthContext } from '../utils/AuthContext';
const token = localStorage.getItem('token');

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let source = axios.CancelToken.source();

    const authenticateUser = async () => {
      try {
        const url = 'http://localhost:3000/authenticate/verify-token';
        if (!token) {
          console.log('no token found');
          return;
        }

        console.log('Token found, making API call');
        const response = await axios.get(url, {
          cancelToken: source.token,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          console.log('Api call successful, setting user');
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
    const data = { ...userData.user, token: userData.token };
    setUser(data);
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
