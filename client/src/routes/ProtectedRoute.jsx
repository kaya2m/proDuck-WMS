import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../utils/AuthUtils/AuthContext';
import { isTokenExpired } from '../utils/AuthUtils/authVerify';

const ProtectedRoute = ({ children }) => {
  const { currentUser, logOut } = useContext(AuthContext);

  useEffect(() => {
    if (isTokenExpired()) {
      logOut();
    }
  }, [logOut]);

  if (!currentUser || currentUser.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
