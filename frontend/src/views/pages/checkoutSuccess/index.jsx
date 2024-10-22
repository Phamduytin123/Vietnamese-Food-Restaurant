import React, { useState } from 'react';
import { IMAGES } from '../../../constants/images';
import { ICONS } from '../../../constants/icons';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import paymentAPI from '../../../api/paymentAPI';
import './index.scss';

const CheckoutSuccess = () => {
  const { method, code } = useParams();
  const [status, setStatus] = useState(false);
  const checkoutZalopay = async () => {
    try {
      const response = await paymentAPI.checkSuccessZalo(code);
      if (response.data.return_code === 1) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    } catch (error) {
      console.log('Failed to check payment: ', error);
    }
  };
  const checkoutMomo = async () => {
    try {
      const response = await paymentAPI.checkSuccessMomo(code);
      if (response.data.resultCode === 0) {
        setStatus(true);
      } else {
        setStatus(false);
      }
    } catch (error) {
      console.log('Failed to check payment: ', error);
    }
  };
  if (method === 'zalopay') {
    checkoutZalopay();
  } else if (method === 'momo') {
    checkoutMomo();
  }
  return (
    <div className="success-page">
      {status ? (
        <div className="content">
          <img src={IMAGES.img_checkout_success} alt="Success" className="success-icon" />
          <h2 className="success-title">Bạn đã thanh toán thành công</h2>
          <p className="success-message">
            Vui lòng đánh giá sản phẩm để chúng tôi biết được cảm nhận của bạn và có thể hỗ trợ bạn trong những trường
            hợp cần thiết
          </p>
        </div>
      ) : (
        <div className="content">
          <img src={ICONS.remove} alt="TB" className="success-icon" />
          <h2 className="success-title">Thanh toán thất bại</h2>
          <p className="success-message">
            Vui lòng làm theo đúng hướng dẫn thanh toán theo hình thức trực tuyến để hoàn tất đơn hàng
          </p>
        </div>
      )}
      <div className="buttons">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button className="button-outline">
            <img src={ICONS.icon_back_home} alt="" />
            Trờ về trang chính
          </button>
        </Link>
        {status ? (
          <button className="button-filled">
            xem đơn hàng
            <FaArrowRight />
          </button>
        ) : (
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <button className="button-filled">
              Thử lại <FaArrowRight />
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSuccess;
