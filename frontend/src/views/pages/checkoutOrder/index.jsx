import React from 'react';
import { IMAGES } from '../../../constants/images';
import { FaArrowRight } from 'react-icons/fa';
import './index.scss';

const CheckoutOrder = () => {
  return (
    <div className="checkout-page">
      <div className="checkout-info">
        <div className="billing-info">
          <h2 className="section-title">Thông tin hoá đơn</h2>
          <div className="form-group">
            <div className="input-pair">
              <div className="input-field">
                <label>Họ và tên</label>
                <input type="text" placeholder="First name" />
              </div>
              <div className="input-field">
                <input type="text" placeholder="Last name" />
              </div>
            </div>
            <div className="input-pair">
              <div className="input-field">
                <label>Tỉnh/ Thành phố</label>
                <select>
                  <option>Select...</option>
                </select>
              </div>
              <div className="input-field">
                <label>Quận/ Huyện</label>
                <select>
                  <option>Select...</option>
                </select>
              </div>
            </div>
            <div className="input-field full-width">
              <label>Địa chỉ</label>
              <input type="text" />
            </div>
            <div className="input-pair">
              <div className="input-field">
                <label>Email</label>
                <input type="email" />
              </div>
              <div className="input-field">
                <label>Phone Number</label>
                <input type="text" />
              </div>
            </div>
          </div>
        </div>

        <div className="payment-options">
          <h2 className="section-title">Lựa chọn thanh toán</h2>
          <div className="payment-methods">
            <div className="payment-method">
              <img src={IMAGES.img_momo} alt="MoMo" />
              <span>MoMo</span>
              <input type="radio" name="payment" />
            </div>
            <hr className="vertical-line" />
            <div className="payment-method">
              <img src={IMAGES.img_vnpay} alt="VN Pay" />
              <span>VN Pay</span>
              <input type="radio" name="payment" />
            </div>
            <hr className="vertical-line" />
            <div className="payment-method">
              <img src={IMAGES.img_zalopay} alt="Zalo Pay" />
              <span>Zalo Pay</span>
              <input type="radio" name="payment" />
            </div>
            <hr className="vertical-line" />
            <div className="payment-method">
              <img src={IMAGES.img_vietelpay} alt="Viettel Pay" />
              <span>Viettel Pay</span>
              <input type="radio" name="payment" />
            </div>
            <hr className="vertical-line" />
            <div className="payment-method">
              <img src={IMAGES.img_creditpay} alt="Thanh toán trực tiếp" />
              <span>Thanh toán trực tiếp</span>
              <input type="radio" name="payment" />
            </div>
          </div>
        </div>

        <div className="additional-info">
          <h2 className="section-title">Các thông tin khác</h2>
          <div className="input-field full-width">
            <label>Ghi chú đơn hàng (Optional)</label>
            <textarea placeholder="Ghi chú về đơn hàng của bạn ...." className="custom-textarea"></textarea>
          </div>
        </div>
      </div>

      <div className="order-summary">
        <h2 className="section-title">Tổng đơn hàng</h2>
        <div className="order-items">
          <div className="item">
            <img src={IMAGES.img_test_checkout} alt="Phở Nam Định" />
            <div className="item-details">
              <div className="product-name">Phở Nam Định</div>
              <div className="product-order">
                <span className="count">1 x </span>
                <span className="cost">30.000</span>
              </div>
            </div>
          </div>
          <div className="item">
            <img src={IMAGES.img_test_checkout} alt="Cao lầu Hội An" />
            <div className="item-details">
              <div className="product-name">Cao lầu Hội An</div>
              <div className="product-order">
                <span className="count">2 x </span>
                <span className="cost">25.000</span>
              </div>
            </div>
          </div>
        </div>
        <div className="total">
          <div className="total-items">
            <div className="item-des">Tổng tiền món ăn: </div>
            <div className="item-val">100.000</div>
          </div>
          <div className="total-items">
            <div className="item-des">Shipping: </div>
            <div className="item-val">Free</div>
          </div>
          <div className="total-items">
            <div className="item-des">Giảm giá: </div>
            <div className="item-val">15.000</div>
          </div>
          <hr />
          <div className="grand-total">
            <div className="item-des">Tổng tiền: </div>
            <div className="item-val">700.000 VND</div>
          </div>
        </div>
        <button className="checkout-button">
          <span>THANH TOÁN</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default CheckoutOrder;
