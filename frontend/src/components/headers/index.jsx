import React from "react";
import { ICONS } from "../../constants/icons";
import { IMAGES } from "../../constants/images";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { IoLocationSharp } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import "./index.scss";

const Header = () => {
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
            <Button className="btn-login">
              <IoMdPerson className="login-icon" />
              <div className="login-text">Login</div>
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
