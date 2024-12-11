import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
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
import Dashboard from '../pages/dashboard';
import History from '../pages/history';
import HistoryDetail from '../pages/historyDetail';
import AdminDashboard from '../pages/admin-dashboard';
import { useAuth } from '../../contexts/AccountContext';
import AdminAccount from '../pages/admin-accounts';
import ProtectedRoute from './protected-route';
import AdminListItem from '../pages/admin-listItem';
import { AdminItemDetail } from '../pages/admin-detailitem';
import VoucherModal from '../pages/voucher-modal';
import AccountDetail from '../pages/account-detail';
import ResetPassword from '../pages/reset-password';

const UserHomePage = LoadableComponent(() => import('../pages/homepage/index'));
const ProductsPage = LoadableComponent(() => import('../pages/product-list/index'));
const AdminDashBoardPage = LoadableComponent(() => import('../pages/admin-dashboard'));
const AdminLayout = LoadableComponent(() => import('../../components/layouts/AdminLayout'));
const AdminOrderLists = LoadableComponent(() => import('../pages/admin-order-lists'));

const AllRoutes = () => {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Nunito Sans', 'Public Sans'], // Danh sách font bạn muốn sử dụng
      },
    });
  }, []);

  const { account } = useAuth();

  // console.log(account)
  // console.log((account && (account.role === "admin" || account.role === "staff")) ? "/admin/dashboard" : "/homepage")

  return (
    <CartProvider>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={account && (account.role === 'admin' || account.role === 'staff') ? '/admin/dashboard' : '/homepage'}
            />
          }
        />
        {/* // public route  */}
        <Route element={<PublicRoute />}>
          <Route path="/homepage" element={<MainLayout component={UserHomePage} />} />
          <Route path="/items" element={<MainLayout component={ProductsPage} />} />
          <Route path="/auth/login" element={<MainLayout component={Login} />} />
          <Route path="/auth/reset-password" element={<MainLayout component={ResetPassword} />} />
          <Route path="/auth/register" element={<MainLayout component={Register} />} />
          <Route path="/food/:id" element={<MainLayout component={FoodDetail} />} />
          <Route path="/checkout/order" element={<MainLayout component={CheckoutOrder} />} />
          <Route path="/checkout/:method/:code" element={<MainLayout component={CheckoutSuccess} />} />
          <Route path="/cart" element={<MainLayout component={ShoppingCart} />} />
          <Route path="/wishlist" element={<MainLayout component={Wishlist} />} />
          <Route path="/dashboard" element={<MainLayout component={Dashboard} />} />
          <Route path="/history" element={<MainLayout component={History} />} />
          <Route path="/history/:id" element={<MainLayout component={HistoryDetail} />} />
          <Route path="/setting" element={<MainLayout component={AccountDetail} />} />
        </Route>
        {/* // admin, staff route  */}
        <Route element={<ProtectedRoute allowedRoles={['admin', 'staff']} />}>
          <Route path="/admin/dashboard" element={<AdminLayout component={<AdminDashboard />} />} />
          <Route path="/admin/order-lists" element={<AdminLayout component={<AdminOrderLists />} />} />
          <Route
            path="/admin/customer-account"
            element={<AdminLayout component={<AdminAccount pageRole={'customer'} />} />}
          />
          <Route path="/admin/products" element={<AdminLayout component={<AdminListItem />} />} />
          <Route path="/admin/products/details" element={<AdminLayout component={<AdminItemDetail />} />} />
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route
              path="/admin/staff-account"
              element={<AdminLayout component={<AdminAccount pageRole={'staff'} />} />}
            />
          </Route>
          <Route path="/admin/products/details/:id" element={<AdminLayout component={<AdminItemDetail />} />} />
          <Route path="/admin/voucher" element={<AdminLayout component={<VoucherModal />} />} />
        </Route>
      </Routes>
    </CartProvider>
  );
};

export default AllRoutes;
