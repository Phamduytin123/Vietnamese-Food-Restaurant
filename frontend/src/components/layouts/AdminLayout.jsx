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
  getItem('Trang chủ', '/admin/dashboard', <LineChartOutlined />),
  getItem('Sản phẩm', '/admin/products', <InboxOutlined />),
  getItem('Đơn hàng', '/admin/order-lists', <TruckOutlined />),
  getItem('Nhân viên', '/admin/staff-account', <SolutionOutlined />),
  getItem('Khách hàng', '/admin/customer-account', <TeamOutlined />),
  getItem('Phiếu giảm giá', '/admin/vouchers', <GiftOutlined />),
  getItem('Cài đặt', '/admin/setting', <SettingOutlined />),
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
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');

    navigate('/');
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
          <div className="position-fixed" style={{width : collapsed ? 80 : 200}}>
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
                {!collapsed && 'Đăng xuất'}
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
