import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import  {useAuth} from '../../contexts/AccountContext.js';

const CustomerRoute = () => {
  const { account } = useAuth();

  if (!account) return <Navigate to='/' />;

  if (account.role !== "customer") return <Navigate to='/' />;

  return <Outlet />;
};

export default CustomerRoute;
