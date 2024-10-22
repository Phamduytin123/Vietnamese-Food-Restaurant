import React, { useState, useEffect } from 'react';
import { IMAGES } from '../../../constants/images';
import { ICONS } from '../../../constants/icons';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import cartAPI from '../../../api/cartAPI';
import LoadingOverlay from '../../../components/loading_overlay';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { get } from 'lodash';

const ShoppingCart = (props) => {
  const [coupon, setCoupon] = useState('');
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const navigate = useNavigate();

  const getCart = async () => {
    try {
      const response = await cartAPI.getCart();
      console.log('Cart: ', response.data);
      setCart(response.data);
    } catch (error) {
      console.log('Failed to fetch cart: ', error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    if (cart) {
      setCheckedItems(cart.map(() => false));
      setQuantities(cart.map((product) => product.quantity));
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      console.log('CheckedItems: ', checkedItems);
      let total = 0;
      let discountAmount = 0;

      cart.forEach((product, index) => {
        if (checkedItems[index]) {
          console.log('Quantities: ', quantities[index]);
          total += quantities[index] * product.itemSize.price;
          discountAmount += product.itemSize.price * quantities[index] * (product.itemSize.item.discount / 100);
        }
      });

      setTotalPrice(total * 1000);
      setDiscount(discountAmount * 1000);

      const finalTotalAmount = total - discountAmount;
      setFinalTotal(finalTotalAmount * 1000);
    }
  }, [quantities, checkedItems]);

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

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);
      await cartAPI.deleteCart(productId);
      const updatedCart = cart.filter((product) => product.id !== productId);
      setCart(updatedCart);
      setCheckedItems(updatedCart.map(() => false));
      setQuantities(updatedCart.map((product) => product.quantity));
    } catch (error) {
      console.log('Failed to delete product: ', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    try {
      setLoading(true);

      const updatePromises = cart.map((product, index) =>
        cartAPI.updateCart(product.id, { quantity: quantities[index] }),
      );
      await Promise.all(updatePromises);
      const updatedCart = cart.map((product, index) => ({
        ...product,
        quantity: quantities[index],
      }));
      const checkedCartItems = updatedCart.filter((_, index) => checkedItems[index]);
      console.log('Checked Cart Items: ', checkedCartItems);
      navigate('/checkout/order', { state: { cart: checkedCartItems } });
    } catch (error) {
      console.log('Failed to checkout: ', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="shopping-cart-container">
      <LoadingOverlay loading={loading} />
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
        {cart.map((product, index) => (
          <div className="cart-item" key={product.id}>
            <input
              type="checkbox"
              className="checkbox"
              checked={checkedItems[index]}
              onChange={handleItemCheck(index)}
            />
            <img src={product.itemSize.item.images[0]} alt={product.itemSize.item.name} />
            <span className="product">{product.itemSize.item.name}</span>
            <span className="cost">{product.itemSize.price.toLocaleString()}.000₫</span>
            <div className="quantity-control-container">
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                <span>{quantities[index]}</span>
                <button onClick={() => handleQuantityChange(index, +1)}>+</button>
              </div>
            </div>
            <span className="size">{product.itemSize.size_vi}</span>
            <span className="total">{(product.itemSize.price * quantities[index]).toLocaleString()}.000₫</span>
            <img
              src={ICONS.icon_xproduct}
              alt=""
              className="delete-product"
              onClick={() => handleDeleteProduct(product.id)}
            />
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
              <span className="item-val">{totalPrice.toLocaleString()}₫</span>
            </div>
            <div className="info-row">
              <span className="item-title">Shipping</span>
              <span className="item-val">Free</span>
            </div>
            <div className="info-row">
              <span className="item-title">Giảm giá</span>
              <span className="item-val">{discount.toLocaleString()}₫</span>
            </div>
            <div className="total-line" />
            <div className="info-row total-row">
              <span className="total-title">Total</span>
              <span className="total-val">{finalTotal.toLocaleString()}₫</span>
            </div>
            <div className="button-checkout">
              <button className="checkout-btn" onClick={handleCheckout}>
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
