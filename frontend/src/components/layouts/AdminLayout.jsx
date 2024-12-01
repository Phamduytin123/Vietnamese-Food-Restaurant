import React, { useState } from 'react';
import './AdminLayout.scss';
import { Button, Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import Header from '../headers';
import {
  GiftOutlined,
  InboxOutlined,
  LineChartOutlined,
  LogoutOutlined,
  SettingOutlined,
  SolutionOutlined,
  TeamOutlined,
  TruckOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AccountContext';
import 'bootstrap/dist/css/bootstrap.min.css';
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Dashboard', '/admin/dashboard', <LineChartOutlined />),
  getItem('Products', '/admin/products', <InboxOutlined />),
  getItem('Order Lists', '/admin/order-lists', <TruckOutlined />),
  getItem('Staff account', '/admin/staff-account', <SolutionOutlined />),
  getItem('Customer account', '/admin/customer-account', <TeamOutlined />),
  getItem('Vouchers', '/admin/vouchers', <GiftOutlined />),
  getItem('Settings', '/admin/setting', <SettingOutlined />),
];

function AdminLayout(props) {
  const { Component, currentPage = 'dashboard' } = props;
  const [collapsed, setCollapsed] = useState(false);
  const { account } = useAuth();

  const navigate = useNavigate();

  const pages_url = {
    'dashboard': '/admin/dashboard',
    'products': '/admin/products',
    'Order Lists': '/admin/order-lists',
    'Staff account': '/admin/staff-account',
    'Customer account': '/admin/customer-account',
    'Vouchers': '/admin/vouchers',
    'Settings': '/admin/setting',
  };

  const onMenuClick = (menuItem) => {
    navigate(menuItem.key);
    // console.log(menuItem.key);
  };
  const handleLogout = () => {
    // logout();
    // navigate('/login');
    console.log('logout');
  };

  return (
    <Layout>
      <Header userInfo={account} />
      <Layout className='admin-layout-content-container'>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className="admin-layout-slider-container"
        >
          <div className="sticky-siderbar-container">
            <Menu
              className="slider-container"
              defaultSelectedKeys={[pages_url[currentPage]]}
              mode="inline"
              theme="light"
              items={items}
              onClick={onMenuClick}
            />
            <div className="d-flex justify-content-center admin-layout-logout-button-container">
              <Button className="admin-layout-logout-button" icon={<LogoutOutlined />} onClick={handleLogout}>
                {!collapsed && 'Đăng xuất'}
              </Button>
            </div>
          </div>
        </Sider>
        <Layout>{Component}</Layout>
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
