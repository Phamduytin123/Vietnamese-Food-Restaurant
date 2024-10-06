import React from "react";
import { useState } from "react";
import { ICONS } from "../../constants/icons";
import { IMAGES } from "../../constants/images";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Dropdown from "react-bootstrap/Dropdown";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import "./index.scss";

const Header = () => {
  // State quản lý trạng thái đăng nhập
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className="container-header">
      <Navbar expand="lg">
        <Container>
          <Navbar.Brand href="#" className="logo-text">
            <img className="logo-header" src={ICONS.logo} alt="logo" />
            Vietnamese Cusine
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Navbar.Text className="location">
                <p className="deliver">Deliver to:</p>
                <IoLocationSharp className="location-icon" />
                <p className="cur-location">Current Location</p>
                <a href="#">172/3 Nguyễn Lương Bằng - Liên Chiểu - Đà Nẵng</a>
              </Navbar.Text>
            </Nav>
            {/* Điều kiện hiển thị */}
            {!isLoggedIn ? (
              // Nếu chưa đăng nhập, hiển thị nút Login
              <Button
                className="btn-login"
                onClick={() => {
                  console.log("Login button clicked");
                  setIsLoggedIn(true);
                }}
              >
                <IoMdPerson className="login-icon" />
                <div className="login-text">Login</div>
              </Button>
            ) : (
              // Nếu đã đăng nhập, hiển thị icon cart và user
              <div className="navbar-icons d-flex align-items-center">
                {/* Cart icon */}
                <div
                  className="cart-icon position-relative me-3"
                  style={{ cursor: "pointer" }}
                >
                  <span className="cart-badge position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    2
                  </span>
                  <img
                    src={ICONS.cart}
                    alt="Cart"
                    className="cart-icon-img"
                    style={{ width: "28px", height: "28px" }}
                  />
                </div>

                {/* User icon với Dropdown */}
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-user"
                    className="user-dropdown-toggle"
                  >
                    <img
                      src={ICONS.user}
                      alt="User"
                      className="user-icon"
                      style={{ width: "28px", height: "28px" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="custom-dropdown-menu">
                    <Dropdown.Item href="#/dashboard">
                      <img
                        src={ICONS.icon_homepage}
                        alt="Dashboard"
                        className="menu-icon"
                      />
                      Homepage
                    </Dropdown.Item>
                    <Dropdown.Item href="#/order-history">
                      <img
                        src={ICONS.icon_order}
                        alt="Order History"
                        className="menu-icon"
                      />
                      Lịch sử đơn hàng
                    </Dropdown.Item>
                    <Dropdown.Item href="#/cart">
                      <img
                        src={ICONS.icon_cart}
                        alt="Cart"
                        className="menu-icon"
                      />
                      Giỏ hàng
                    </Dropdown.Item>
                    <Dropdown.Item href="#/favorites">
                      <img
                        src={ICONS.icon_heart}
                        alt="Favorites"
                        className="menu-icon"
                      />
                      Danh sách món ăn đã thích
                    </Dropdown.Item>
                    <Dropdown.Item href="#/settings">
                      <img
                        src={ICONS.icon_setting}
                        alt="Settings"
                        className="menu-icon"
                      />
                      Cài đặt
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#/logout">
                      <img
                        src={ICONS.icon_logout}
                        alt="Logout"
                        className="menu-icon"
                      />
                      Log-out
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
