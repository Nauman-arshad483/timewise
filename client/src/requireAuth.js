import React from 'react';
import { Navigate } from 'react-router-dom';

const requireAuth = (Component) => {
  const AuthenticatedComponent = (props) => {
    const user = JSON.parse(localStorage.getItem('userData'));

    if (!user) {
      return <Navigate to="/login" />;
    }

    return <Component {...props} />;
  };

  return AuthenticatedComponent;
};

export default requireAuth;
