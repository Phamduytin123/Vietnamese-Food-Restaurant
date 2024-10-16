import React, { useState } from 'react';
import { IMAGES } from '../../../constants/images';
import { ICONS } from '../../../constants/icons';
import { FaArrowRight } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import './index.scss';

const ShoppingCart = () => {
  const [coupon, setCoupon] = useState('');
  const products = [
    {
      id: 1,
      name: 'Phở bò Nam Định',
      price: 70000,
      quantity: 1,
      size: 'Nhỏ',
      total: 70000,
      image: IMAGES.img_card_test,
    },
    {
      id: 2,
      name: 'Cao lầu Hội An',
      price: 250000,
      quantity: 3,
      size: 'Lớn',
      total: 250000,
      image: IMAGES.img_card_test,
    },
  ];
  const [checkedItems, setCheckedItems] = useState(products.map(() => false));
  const [quantities, setQuantities] = useState(products.map((product) => product.quantity));
  const [cartItems, setCartItems] = useState(products);
  const handleCouponApply = () => {
    alert(`Coupon Code: ${coupon}`);
  };
  const handleAllCheck = (event) => {
    const newCheckedItems = checkedItems.map(() => event.target.checked);
    setCheckedItems(newCheckedItems);
  };
  const handleQuantityChange = (index, change) => {
    const newQuantities = [...quantities];
    newQuantities[index] += change;
    if (newQuantities[index] < 1) {
      newQuantities[index] = 1;
    }
    setQuantities(newQuantities);
  };
  const handleItemCheck = (index) => (event) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
  };
  const handleDeleteItem = (index) => {
    const newCartItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newCartItems);
    const newCheckedItems = checkedItems.filter((_, i) => i !== index);
    setCheckedItems(newCheckedItems);
    const newQuantities = quantities.filter((_, i) => i !== index);
    setQuantities(newQuantities);
  };

  return (
    <div className="shopping-cart-container">
      <div className="shopping-cart">
        <div className="cart-header">
          <h2>Giỏ hàng</h2>
        </div>
        <div className="cart-sub-header">
          <input
            type="checkbox"
            className="checkbox"
            checked={checkedItems.every((item) => item)}
            onChange={handleAllCheck}
          />
          <span className="sub-product">Sản phẩm</span>
          <span className="sub-cost">Giá</span>
          <span className="sub-count">Số lượng</span>
          <span className="sub-size">Size</span>
          <span className="sub-total">Tổng tiền</span>
        </div>
        {products.map((product, index) => (
          <div className="cart-item" key={product.id}>
            <input
              type="checkbox"
              className="checkbox"
              checked={checkedItems[index]}
              onChange={handleItemCheck(index)}
            />
            <img src={product.image} alt={product.name} />
            <span className="product">{product.name}</span>
            <span className="cost">{product.price.toLocaleString()} ₫</span>
            <div className="quantity-control">
              <button onClick={() => handleQuantityChange(index, -1)}>-</button>
              <span>{quantities[index]}</span>
              <button onClick={() => handleQuantityChange(index, +1)}>+</button>
            </div>
            <span className="size">{product.size}</span>
            <span className="total">{(product.price * quantities[index]).toLocaleString()} ₫</span>
            <img src={ICONS.icon_xproduct} alt="" className="delete-product" onClick={() => handleDeleteItem(index)} />
          </div>
        ))}
        <div className="cart-footer">
          <button className="back-button">
            <FaArrowLeft />
            Trở lại
          </button>
        </div>
      </div>

      <div className="card-total">
        <div className="cart-total-details">
          <div className="heading">Tổng tiền giỏ hàng</div>
          <div className="total-info">
            <div className="info-row">
              <span className="item-title">Tổng tiền món ăn</span>
              <span className="item-val">320,000</span>
            </div>
            <div className="info-row">
              <span className="item-title">Shipping</span>
              <span className="item-val">Free</span>
            </div>
            <div className="info-row">
              <span className="item-title">Giảm giá</span>
              <span className="item-val">24,000</span>
            </div>
            <div className="total-line" />
            <div className="info-row total-row">
              <span className="total-title">Total</span>
              <span className="total-val">280,000 VND</span>
            </div>
            <div className="button-checkout">
              <button className="checkout-btn">
                ĐẶT HÀNG <FaArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="coupon-code">
          <div>Coupon Code</div>
          <div className="coupon-code-content">
            <input type="text" placeholder="Email address" value={coupon} onChange={(e) => setCoupon(e.target.value)} />
            <button onClick={handleCouponApply}>APPLY COUPON</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
