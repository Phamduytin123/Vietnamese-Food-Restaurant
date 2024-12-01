import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import  {useAuth} from '../../contexts/AccountContext.js';

const StaffRoute = () => {
  const { account } = useAuth();

  if (!account) return <Navigate to='/' />;

  if (account.role !== "staff") return <Navigate to='/' />;

  return <Outlet />;
};

export default StaffRoute;