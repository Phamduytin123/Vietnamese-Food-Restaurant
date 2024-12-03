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
import { useNavigate, useLocation } from 'react-router-dom';
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
  const [collapsed, setCollapsed] = useState(false);
  const { account } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onMenuClick = (menuItem) => {
    navigate(menuItem.key);
  };

  const handleLogout = () => {
    // logout();
    // navigate('/login');
    console.log('logout');
  };

  return (
    <Layout>
      <Header userInfo={account} />
      <Layout className="admin-layout-content-container ">
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          className="admin-layout-slider-container"
        >
          <div className="sticky-siderbar-container">
            <Menu
              className="slider-container"
              defaultSelectedKeys={[location.pathname]}
              mode="inline"
              theme="light"
              items={items}
              onClick={onMenuClick}
            />
            <div className="d-flex justify-content-center admin-layout-logout-button-container">
              <Button className="admin-layout-logout-button" icon={<LogoutOutlined />} onClick={handleLogout}>
                {!collapsed && 'Logout'}
              </Button>
            </div>
          </div>
        </Sider>
        <props.component />
      </Layout>
    </Layout>
  );
}

export default AdminLayout;
