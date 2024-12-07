import React, { useState, useEffect } from 'react';
import { IMAGES } from '../../../constants/images';
import { FaArrowRight } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import locationAPI from '../../../api/locationAPI';
import LoadingOverlay from '../../../components/loading_overlay';
import paymentAPI from '../../../api/paymentAPI';
import './index.scss';

const CheckoutOrder = () => {
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [note, setNote] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [formValid, setFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { cart, voucher } = location.state || {};

  const itemSizePrices = cart.map((product) => {
    const itemSize = product.itemSize.item.itemSizes.find((itemSize) => product.itemSizeId === itemSize.id);
    if (itemSize) {
      const priceString = itemSize.price.replace(/[^0-9.]+/g, ''); // Loại bỏ các ký tự không phải số và dấu chấm
      return parseFloat(priceString); // Chuyển đổi chuỗi thành số
    }
    return 0;
  });

  const totalPrice = cart ? cart.reduce((acc, product, index) => acc + itemSizePrices[index] * product.quantity, 0) : 0;

  const discount = cart
    ? cart.reduce(
        (acc, product, index) =>
          acc + itemSizePrices[index] * product.quantity * (product.itemSize.item.discount / 100),
        0,
      )
    : 0;

  // Tính tổng tiền cuối cùng
  let finalTotal = totalPrice - discount;
  if (voucher) {
    finalTotal *= 1 - voucher.discount / 100;
  }

  useEffect(() => {
    // Lấy danh sách tỉnh thành
    locationAPI
      .getProvinces()
      .then((response) => {
        if (response.data.error === 0) {
          setProvinces(response.data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching provinces:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProvince) {
      setLoading(true);
      // Lấy danh sách quận huyện dựa trên tỉnh thành đã chọn
      locationAPI
        .getDistricts(selectedProvince)
        .then((response) => {
          if (response.data.error === 0) {
            setDistricts(response.data.data);
          }
        })
        .catch((error) => {
          console.error('Error fetching districts:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setDistricts([]);
    }
  }, [selectedProvince]);

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedDistrict('');
  };

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
  };

  const isVietnamesePhoneNumber = (number) => {
    return /(?:\+84|0084|0)[235789][0-9]{1,2}[0-9]{7}(?:[^\d]+|$)/g.test(number);
  };

  const handleEmailChange = (event) => {
    const inputEmail = event.target.value;
    setEmail(inputEmail);
    if (!validateEmail(inputEmail)) {
      setEmailError('Email không hợp lệ');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (event) => {
    const inputPhone = event.target.value;
    setPhone(inputPhone);
    if (!isVietnamesePhoneNumber(inputPhone)) {
      setPhoneError('Số điện thoại không hợp lệ');
    } else {
      setPhoneError('');
    }
  };
  const getFullAddress = () => {
    const provinceName = provinces.find((province) => province.id === selectedProvince)?.full_name || '';
    const districtName = districts.find((district) => district.id === selectedDistrict)?.full_name || '';
    return `${address}, ${districtName}, ${provinceName}`;
  };
  const payZalo = async () => {
    try {
      const checkoutData = {
        carts: cart.map((product) => ({
          id: product.id,
        })),
        phoneNumber: phone,
        email: email,
        receiver: `${firstName} ${lastName}`,
        address: getFullAddress(),
        note: note,
        totalPrice: finalTotal,
        rootRedirectUrl: 'https://4261-171-225-184-76.ngrok-free.app',
      };
      console.log('checkoutData: ', checkoutData);
      const response = await paymentAPI.payZalopay(checkoutData);
      console.log('response: ', response);
      if (response.data.return_code === 1) {
        window.location.href = response.data.order_url;
      } else {
        toast.error('Đã có lỗi xảy ra khi xử lý thanh toán ZaloPay');
      }
    } catch (error) {
      console.log('Failed to fetch cart: ', error);
    }
  };

  const payMomo = async () => {
    try {
      const checkoutData = {
        carts: cart.map((product) => ({
          id: product.id,
        })),
        phoneNumber: phone,
        email: email,
        receiver: `${firstName} ${lastName}`,
        address: getFullAddress(),
        note: note,
        totalPrice: finalTotal,
        rootRedirectUrl: 'https://4261-171-225-184-76.ngrok-free.app',
      };
      const response = await paymentAPI.payMomo(checkoutData); // Giả sử bạn có API cho Momo
      if (response.data.return_code === 1) {
        window.location.href = response.data.order_url;
      } else {
        toast.error('Đã có lỗi xảy ra khi xử lý thanh toán Momo');
      }
    } catch (error) {
      console.log('Failed to fetch cart: ', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedProvince && selectedDistrict && paymentMethod && !emailError && !phoneError) {
      console.log('Submit form: ' + getFullAddress() + '');
      try {
        switch (paymentMethod) {
          case 'zalopay':
            await payZalo();
            break;
          case 'momo':
            await payMomo();
            break;
          default:
            toast.info('Phương thức thanh toán này sẽ được áp dụng trong thời gian tới');
            break;
        }
      } catch (error) {
        console.log('Failed to process payment: ', error);
        toast.error('Đã có lỗi xảy ra khi xử lý thanh toán');
      }
    } else {
      toast.warning('Vui lòng điền đầy đủ thông tin');
    }
  };

  useEffect(() => {
    setFormValid(
      firstName &&
        lastName &&
        selectedProvince &&
        selectedDistrict &&
        address &&
        email &&
        phone &&
        paymentMethod &&
        !emailError &&
        !phoneError,
    );
  }, [
    firstName,
    lastName,
    selectedProvince,
    selectedDistrict,
    address,
    email,
    phone,
    paymentMethod,
    emailError,
    phoneError,
  ]);

  return (
    <div className="checkout-page">
      <LoadingOverlay loading={loading} />
      <div className="billing-info">
        <h2 className="section-title">Thông tin hoá đơn</h2>
        <form onSubmit={handleSubmit} className="form" method="post">
          <div className="checkout-info">
            <div className="form-group">
              <div className="input-pair">
                <div className="input-field">
                  <label>First name</label>
                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="input-field">
                  <label>Last name</label>
                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="input-pair">
                <div className="input-field">
                  <label>Tỉnh/ Thành phố</label>
                  <select value={selectedProvince} onChange={handleProvinceChange}>
                    <option value="">Select...</option>
                    {provinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.full_name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="input-field">
                  <label>Quận/ Huyện</label>
                  <select value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)}>
                    <option value="">Select...</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.full_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input-field full-width">
                <label>Địa chỉ</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
              </div>
              <div className="input-pair">
                <div className="input-field">
                  <label>Email</label>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input type="email" value={email} onChange={handleEmailChange} required />
                    {emailError && <p style={{ color: 'red', margin: '5px 0 0 0' }}>{emailError}</p>}
                  </div>
                </div>
                <div className="input-field">
                  <label>Phone Number</label>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <input type="text" value={phone} onChange={handlePhoneChange} required />
                    {phoneError && <p style={{ color: 'red' }}>{phoneError}</p>}
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
                  <input type="radio" name="payment" value="momo" onChange={(e) => setPaymentMethod(e.target.value)} />
                </div>
                <hr className="vertical-line" />
                <div className="payment-method">
                  <img src={IMAGES.img_vnpay} alt="VN Pay" />
                  <span>VN Pay</span>
                  <input type="radio" name="payment" value="vnpay" onChange={(e) => setPaymentMethod(e.target.value)} />
                </div>
                <hr className="vertical-line" />
                <div className="payment-method">
                  <img src={IMAGES.img_zalopay} alt="Zalo Pay" />
                  <span>Zalo Pay</span>
                  <input
                    type="radio"
                    name="payment"
                    value="zalopay"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>
                <hr className="vertical-line" />
                <div className="payment-method">
                  <img src={IMAGES.img_vietelpay} alt="Viettel Pay" />
                  <span>Viettel Pay</span>
                  <input
                    type="radio"
                    name="payment"
                    value="viettelpay"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>
                <hr className="vertical-line" />
                <div className="payment-method">
                  <img src={IMAGES.img_creditpay} alt="Thanh toán trực tiếp" />
                  <span>Thanh toán trực tiếp</span>
                  <input
                    type="radio"
                    name="payment"
                    value="direct"
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="additional-info">
              <h2 className="section-title">Các thông tin khác</h2>
              <div className="input-field full-width">
                <label>Ghi chú đơn hàng (Optional)</label>
                <textarea
                  placeholder="Ghi chú về đơn hàng của bạn ...."
                  className="custom-textarea"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div className="order-summary">
            <h2 className="section-title">Tổng đơn hàng</h2>
            <div className="order-items">
              {cart &&
                cart.map((product) => (
                  <div key={product.id} className="item">
                    <img src={product.itemSize.item.images[0]} alt={product.itemSize.item.name} />
                    <div className="item-details">
                      <div className="product-name">{product.itemSize.item.name}</div>
                      <div className="product-order">
                        <span className="count">{product.quantity} x </span>
                        <span className="cost">{(1000 * itemSizePrices).toLocaleString()}₫</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <div className="total">
              <div className="total-items">
                <div className="item-des">Tổng tiền món ăn: </div>
                <div className="item-val">{(1000 * totalPrice).toLocaleString()}₫</div>
              </div>
              <div className="total-items">
                <div className="item-des">Shipping: </div>
                <div className="item-val">Free</div>
              </div>
              <div className="total-items">
                <div className="item-des">Giảm giá: </div>
                <div className="item-val">{(1000 * discount).toLocaleString()}₫</div>
              </div>
              {voucher && (
                <div className="total-items">
                  <div className="item-des">Voucher: </div>
                  <div className="item-val">
                    -{((1000 * (totalPrice - discount) * voucher.discount) / 100).toLocaleString()}₫({voucher.discount}
                    %Off)
                  </div>
                </div>
              )}
              <hr />
              <div className="grand-total">
                <div className="item-des">Tổng tiền: </div>
                <div className="item-val">{(1000 * finalTotal).toLocaleString()}₫</div>
              </div>
            </div>
            <button className="checkout-button" type="submit" disabled={!formValid}>
              <input type="submit" value="THANH TOÁN" />
              <FaArrowRight />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutOrder;
