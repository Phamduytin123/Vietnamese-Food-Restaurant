import Footer from '../footers';
import Header from '../headers';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MainLayout.scss';

function MainLayout(props) {
  const userInfo = JSON.parse(localStorage.getItem('user_info')) || {};
  return (
    <div className="frame-wrapper">
      <Header userInfo={userInfo} />
      <div className="frame-body">
        <props.component />
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        newestOnTop={false}
        hideProgressBar={false}
        rtl={false}
        closeOnClick
        draggable
        pauseOnFocusLoss
        theme="light"
        pauseOnHover
      />
    </div>
  );
}

export default MainLayout;
