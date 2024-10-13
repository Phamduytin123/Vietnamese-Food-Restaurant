import Footer from "../footers";
import Header from "../headers";
import React from "react";
import { Outlet } from 'react-router-dom';
import "./MainLayout.scss";

function MainLayout(props) {
  return (
    <div className="frame-wrapper">
      <Header />
      <div className="frame-body">
        <props.component />
      </div>
      <Footer />
    </div>
  );
}

export default MainLayout;
