import React, { useState, useEffect } from 'react';
import { IMAGES } from '../../../constants/images';
import { ICONS } from '../../../constants/icons';
import { FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import cartAPI from '../../../api/cartAPI';
import voucherAPI from '../../../api/voucherAPI';
import LoadingOverlay from '../../../components/loading_overlay';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { useCart } from '../../../contexts/CartContext';
import { toast } from 'react-toastify';
import { forEach, get, set } from 'lodash';

const ShoppingCart = (props) => {
  const [cart, setCart] = useState([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState('');
  const [vouchers, setVouchers] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [prices, setPrices] = useState([]);
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const { updateCartCount, setCartCount, cartCount } = useCart();

  const navigate = useNavigate();

  const getCart = async () => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart();
      console.log('Cart: ', response.data);
      setCart(response.data);
    } catch (error) {
      console.log('Failed to fetch cart: ', error);
    } finally {
      setLoading(false);
    }
  };
  const getVoucher = async () => {
    try {
      setLoading(true);
      const response = await voucherAPI.getVoucher();
      console.log('Voucher: ', response.data);
      setVouchers(response.data);
    } catch (error) {
      console.log('Failed to fetch voucher: ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
    getVoucher();
  }, []);

  useEffect(() => {
    if (cart) {
      setCheckedItems(cart.map(() => false));
      setQuantities(cart.map((product) => product.quantity));
      setSelectedSizes(cart.map((product) => product.itemSizeId));
      setPrices(cart.map((product) => product.itemSize.price));
      updateCartCount();
    }
  }, [cart]);

  useEffect(() => {
    if (cart) {
      let total = 0;
      let discountAmount = 0;

      cart.forEach((product, index) => {
        if (checkedItems[index]) {
          total += quantities[index] * prices[index];
          discountAmount += prices[index] * quantities[index] * (product.itemSize.item.discount / 100);
        }
      });

      setTotalPrice(total * 1000);
      setDiscount(discountAmount * 1000);

      let finalTotalAmount = total - discountAmount;
      if (appliedVoucher) {
        finalTotalAmount *= 1 - appliedVoucher.discount / 100;
      }
      setFinalTotal(finalTotalAmount * 1000);
    }
  }, [quantities, checkedItems, prices, , appliedVoucher]);

  const handleCouponApply = () => {
    const selectedVoucher = vouchers.find((voucher) => voucher.id === +selectedVoucherId);
    if (selectedVoucher) {
      setAppliedVoucher(selectedVoucher);
      toast.success(
        `Applied Voucher: ${selectedVoucher.code} - ${selectedVoucher.name} (${selectedVoucher.discount}% off)`,
      );
    } else {
      toast.warning('Please select a voucher');
    }
  };

  const handleAllCheck = (event) => {
    const newCheckedItems = checkedItems.map(() => event.target.checked);
    setCheckedItems(newCheckedItems);
  };

  const handleQuantityChange = (index, change) => {
    const newQuantities = [...quantities];
    newQuantities[index] += change;
    setCartCount(cartCount + change);
    if (newQuantities[index] < 1) {
      newQuantities[index] = 1;
      setCartCount(cartCount);
    }
    setQuantities(newQuantities);
  };

  const handleItemCheck = (index) => (event) => {
    const newCheckedItems = [...checkedItems];
    newCheckedItems[index] = event.target.checked;
    setCheckedItems(newCheckedItems);
  };

  const handleSizeChange = async (index, newSize, itemSizes) => {
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes[index] = newSize;
    setSelectedSizes(newSelectedSizes);

    try {
      setLoading(true);
      const newSizeNumber = Number(newSize);
      const selectedSize = itemSizes.find((item) => item.id === newSizeNumber);
      if (selectedSize) {
        const newPrice = parseFloat(selectedSize.price.replace(/[^0-9.-]+/g, ''));
        const newPrices = [...prices];
        newPrices[index] = newPrice;
        setPrices(newPrices);
      }
    } catch (error) {
      console.error('Error fetching product details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      setLoading(true);
      await cartAPI.deleteCart(productId);
      const updatedCart = cart.filter((product) => product.id !== productId);
      setCart(updatedCart);
      setCheckedItems(updatedCart.map(() => false));
      setQuantities(updatedCart.map((product) => product.quantity));
      updateCartCount();
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
        cartAPI.updateCart(product.id, { quantity: quantities[index], itemSizeId: +selectedSizes[index] }),
      );
      await Promise.all(updatePromises);
      const updatedCart = cart.map((product, index) => ({
        ...product,
        quantity: quantities[index],
        itemSizeId: +selectedSizes[index],
      }));
      const checkedCartItems = updatedCart.filter((_, index) => checkedItems[index]);
      if (checkedCartItems.length === 0) {
        toast.warning('Vui lòng chọn ít nhất một sản phẩm để thanh toán.');
      } else {
        updateCartCount();
        navigate('/checkout/order', { state: { cart: checkedCartItems, voucher: appliedVoucher } });
      }
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
          <div className="cart-item" key={product.itemSize.itemId}>
            <input
              type="checkbox"
              className="checkbox"
              checked={checkedItems[index]}
              onChange={handleItemCheck(index)}
            />
            <img src={product.itemSize.item.images[0]} alt={product.itemSize.item.name} />
            <span className="product">{product.itemSize.item.name}</span>
            <span className="cost">{(prices[index] * 1000).toLocaleString()}₫</span>
            <div className="quantity-control-container">
              <div className="quantity-control">
                <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                <span>{quantities[index]}</span>
                <button onClick={() => handleQuantityChange(index, +1)}>+</button>
              </div>
            </div>
            <span className="size">
              <select
                value={selectedSizes[index]}
                onChange={(event) => handleSizeChange(index, event.target.value, product.itemSize.item.itemSizes)}
              >
                {product.itemSize.item.itemSizes.map((itemSize) => (
                  <option key={itemSize.id} value={itemSize.id}>
                    {itemSize.size}
                  </option>
                ))}
              </select>
            </span>
            <span className="total">{(prices[index] * quantities[index]).toLocaleString()}.000₫</span>
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
            {appliedVoucher && (
              <div className="info-row">
                <span className="item-title">Voucher</span>
                <span className="item-val">
                  -{(((totalPrice - discount) * appliedVoucher.discount) / 100).toLocaleString()}₫(
                  {appliedVoucher.discount}%Off)
                </span>
              </div>
            )}
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
            <select value={selectedVoucherId} onChange={(e) => setSelectedVoucherId(e.target.value)}>
              <option value="">Select a voucher</option>
              {vouchers.map((voucher) => (
                <option key={voucher.id} value={voucher.id}>
                  {voucher.code}({voucher.discount}% off)
                </option>
              ))}
            </select>
            <button onClick={handleCouponApply}>APPLY COUPON</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
