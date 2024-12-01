import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import  {useAuth} from '../../contexts/AccountContext.js';

const AdminRoute = () => {
  const { account } = useAuth();

  if (!account) return <Navigate to='/' />;

  if (account.role !== "admin") return <Navigate to='/' />;

  return <Outlet />;
};

export default AdminRoute;
