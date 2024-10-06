import Footer from "../footers";
import Header from "../headers";
import React from "react";
import "./MainLayout.scss";

function MainLayout() {
  return (
    <div className="frame-wrapper">
      <Header />

      <Footer />
    </div>
  );
}

export default MainLayout;
