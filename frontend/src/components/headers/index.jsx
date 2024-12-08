import React from 'react';
import { IoCartOutline } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { RiStackLine } from 'react-icons/ri';
import { MdOutlineHistory } from 'react-icons/md';
import { IoSettingsOutline, IoLogOutOutline } from 'react-icons/io5';
import { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import { IoMdPerson } from 'react-icons/io';
import './index.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from '../../contexts/AccountContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ICONS } from '../../constants/icons';

const Header = ({ userInfo }) => {
  const { cartCount } = useCart();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { setAccount, account } = useAuth();
  const isAdmin = account && (account.role === 'admin' || account.role === 'customer');

  const handleLogout = async () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_info');
    setAccount(null);
    navigate('/');
  };

  const getProfile = () => {
    if (userInfo) {
      setProfile(userInfo);
      setIsLoggedIn(true);
    }
    if (!localStorage.getItem('access_token')) {
      setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    getProfile();
  }, [localStorage.getItem('access_token')]);
  return (
    <div className="container-header position-sticky sticky-top">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        progress={undefined}
        theme="colored"
      />
      <Navbar expand="lg d-flex justify-content-center w-100">
        <Container className="header-container">
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Navbar.Text className="location">
                <img
                  alt="website logo"
                  src={ICONS.logo}
                  className="header-logo"
                  onClick={() => {
                    if (isAdmin) {
                      navigate('/admin/dashboard');
                      return;
                    }
                    navigate('/items');
                  }}
                />
                {!isAdmin && (
                  <div>
                    <p
                      className={`header-title-hover ${location.pathname === '/homepage' && 'header-title-selected'}`}
                      onClick={() => {
                        navigate('/homepage');
                      }}
                    >
                      Trang chủ
                    </p>
                    <p
                      className={`header-title-hover ${location.pathname === '/items' && 'header-title-selected'}`}
                      onClick={() => {
                        navigate('/items');
                      }}
                    >
                      Sản phẩm
                    </p>
                  </div>
                )}
                {/* <p className="deliver">Deliver to:</p>
                <IoLocationSharp className="location-icon" />
                <p className="cur-location">Current Location</p>
                <a
                  href="https://www.google.com/maps/place/74+%C4%90.+Ng.+S%C4%A9+Li%C3%AAn,+Ho%C3%A0+Minh,+Li%C3%AAn+Chi%E1%BB%83u,+%C4%90%C3%A0+N%E1%BA%B5ng+50000,+Vi%E1%BB%87t+Nam/@16.075226,108.153784,17z/data=!3m1!4b1!4m6!3m5!1s0x314218d98afc036b:0x3c21d7bc0132950a!8m2!3d16.0752209!4d108.1563589!16s%2Fg%2F11mvq3jn29?hl=vi-VN&entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  172/3 Nguyễn Lương Bằng - Liên Chiểu - Đà Nẵng
                </a> */}
              </Navbar.Text>
            </Nav>
            {/* Điều kiện hiển thị */}
            {!isLoggedIn ? (
              <div className="d-flex">
                <Button
                  className="btn-login"
                  onClick={() => {
                    navigate('/auth/login');
                  }}
                >
                  <IoMdPerson className="login-icon" />
                  <div className="login-text">Đăng nhập</div>
                </Button>
                <Button
                  className="btn-login"
                  onClick={() => {
                    navigate('/auth/register');
                  }}
                >
                  <IoMdPerson className="login-icon" />
                  <div className="login-text">Đăng kí</div>
                </Button>
              </div>
            ) : (
              // Nếu chưa đăng nhập, hiển thị nút Login

              // Nếu đã đăng nhập, hiển thị icon cart và user
              <div className="navbar-icons d-flex align-items-center">
                {/* Cart icon */}

                {userInfo.role === 'customer' && (
                  <div className="cart-icon position-relative me-3" style={{ cursor: 'pointer' }}>
                    <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartCount}
                    </span>

                    <IoCartOutline
                      className="cart-icon-img"
                      alt="Cart"
                      onClick={() => {
                        navigate('/cart');
                      }}
                    />
                  </div>
                )}

                {/* User icon với Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle variant="link" id="dropdown-user" className="user-dropdown-toggle d-flex">
                    <img
                      src={profile.avatar}
                      alt="User"
                      className="user-icon"
                      style={{ width: '28px', height: '28px' }}
                    />
                    <p className="user-name">{profile.name}</p>
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="custom-dropdown-menu">
                    <Dropdown.Item
                      onClick={() => {
                        navigate('/dashboard');
                      }}
                    >
                      <RiStackLine className="dropdown-icon" />
                      Trang chủ
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        navigate('/history');
                      }}
                    >
                      <MdOutlineHistory className="dropdown-icon" />
                      Lịch sử đơn hàng
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        navigate('/wishlist');
                      }}
                    >
                      <IoMdHeartEmpty className="dropdown-icon" />
                      Danh sách món ăn đã thích
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        navigate('/setting');
                      }}
                    >
                      <IoSettingsOutline className="dropdown-icon" />
                      Cài đặt
                    </Dropdown.Item>
                    <Dropdown.Divider className="dropdown-icon" />
                    <Dropdown.Item onClick={handleLogout}>
                      <IoLogOutOutline className="dropdown-icon" />
                      Đăng xuất
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
