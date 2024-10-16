import React from 'react';
import { IMAGES } from '../../../constants/images';
import { ICONS } from '../../../constants/icons';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './index.scss';

const CheckoutSuccess = () => {
  return (
    <div className="success-page">
      <div className="content">
        <img src={IMAGES.img_checkout_success} alt="Success" className="success-icon" />
        <h2 className="success-title">Bạn đã thanh toán thành công</h2>
        <p className="success-message">
          Vui lòng đánh giá sản phẩm để chúng tôi biết được cảm nhận của bạn và có thể hỗ trợ bạn trong những trường hợp
          cần thiết
        </p>
      </div>
      <div className="buttons">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <button className="button-outline">
            <img src={ICONS.icon_back_home} alt="" />
            Trờ về trang chính
          </button>
        </Link>
        <button className="button-filled">
          xem đơn hàng
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
