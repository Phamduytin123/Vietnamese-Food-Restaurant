import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../contexts/AccountContext.js';

const ProtectedRoute = ({ allowedRoles }) => {
  const { account } = useAuth();

  if (!account) {
    return <Navigate to="/homepage" />;
  }

  if (!allowedRoles.includes(account.role)) {
    return <Navigate to="/homepage" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;