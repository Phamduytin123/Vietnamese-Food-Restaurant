import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import PublicRoute from './public-route';
import React, { useEffect } from 'react';
import WebFont from 'webfontloader';
import Login from '../pages/login';
import Register from '../pages/register';
import FoodDetail from '../pages/fooddetail';
import Wishlist from '../pages/wishlist';
import MainLayout from '../../components/layouts/MainLayout';
import LoadableComponent from '../../components/loadable-components/loadable-component';
import CheckoutOrder from '../pages/checkoutOrder';
import CheckoutSuccess from '../pages/checkoutSuccess';
import ShoppingCart from '../pages/orrderCard';
import { CartProvider } from '../../contexts/CartContext';
const UserHomePage = LoadableComponent(() => import('../pages/homepage/index'));

const ProductsPage = LoadableComponent(() => import('../pages/product-list/index'));

const AllRoutes = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito Sans', 'Public Sans'], // Danh sách font bạn muốn sử dụng
      },
    });
  }, []);
  return (
    <CartProvider>
    <Routes>
      {/* <Route path="/" element={<Navigate to={"/introduce"} />} /> */}
      {/* // public route  */}
      <Route element={<PublicRoute />}>
        <Route path="/" element={<MainLayout component={UserHomePage} />} />
        <Route path="/items" element={<MainLayout component={ProductsPage} />} />
        <Route path="/auth/login" element={<MainLayout component={Login} />} />
        <Route path="/auth/register" element={<MainLayout component={Register} />} />
        <Route path="/food/:id" element={<MainLayout component={FoodDetail} />} />
        <Route path="/checkout/order" element={<MainLayout component={CheckoutOrder} />} />
        <Route path="/checkout/:method/:code" element={<MainLayout component={CheckoutSuccess} />} />
        <Route path="/cart" element={<MainLayout component={ShoppingCart} />} />
        <Route path="/wishlist" element={<MainLayout component={Wishlist} />} />
      </Route>
    </Routes>
    </CartProvider>
  );
};

export default AllRoutes;
