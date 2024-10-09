import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './public-route';
import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import HomePage from '../pages/homepage';
import Login from '../pages/login';
import Register from '../pages/register';
import FoodDetail from '../pages/fooddetail';
import MainLayout from '../../components/layouts/MainLayout';

const AllRoutes = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito Sans', 'Public Sans'], // Danh sách font bạn muốn sử dụng
      },
    });
  }, []);
  return (
    <Routes>
      {/* <Route path="/" element={<Navigate to={"/introduce"} />} /> */}

      {/* // public route  */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<MainLayout component={HomePage} />} />
        <Route path="/auth/login" element={<MainLayout component={Login} />} />
        <Route path="/auth/register" element={<MainLayout component={Register} />} />
        <Route path="/food/:id" element={<MainLayout component={FoodDetail} />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
