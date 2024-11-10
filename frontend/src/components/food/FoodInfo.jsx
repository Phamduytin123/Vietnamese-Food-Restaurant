import styles from './Food.scss';

import ReactStars from 'react-rating-stars-component';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { columns } from './constant';
import { ICONS } from '../../constants/icons';
import ButtonPrimary from '../button/ButtonPrimary';
import ItemCarousel from './ItemCarousel';
import { toast } from 'react-toastify';
import { useCart } from '../../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
const foodItems = [
  {
    name: 'Mì Quảng',
    image:
      'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    description: 'Món ăn đặc sản của Quảng Nam với nước dùng thơm ngon.',
  },
  {
    name: 'Bánh Dừa',
    image:
      'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    description: 'Bánh ngọt giòn tan, rất thích hợp làm quà.',
  },
  {
    name: 'Phở',
    image:
      'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    description: 'Món ăn nổi tiếng của Việt Nam với nước dùng thanh mát.',
  },
  {
    name: 'Bún Chả',
    image:
      'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    description: 'Món ăn truyền thống Hà Nội với thịt nướng và bún.',
  },
  {
    name: 'Chả Giò',
    image:
      'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
    description: 'Món ăn chiên giòn, rất ngon khi chấm với nước mắm.',
  },
  // Thêm các món ăn khác
];
const FoodInfo = ({ food }) => {
  const { addToCart } = useCart();
  const [activeButton, setActiveButton] = useState(null); // State to track active button
  const [price, setPrice] = useState(food.minPrice);
  const navigate = useNavigate();
  const handleClick = (size) => {
    setActiveButton(size);
    setPrice(food.itemSizes[size].price);
  };

  const [value, setValue] = useState(1);

  const handleIncrease = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleDecrease = () => {
    setValue((prevValue) => prevValue - 1);
  };

  const handleChangeQuantity = (e) => {
    const newValue = Number(e.target.value);
    setValue(newValue);

    if (newValue > 999) {
      setValue(999);
    }
    if (newValue < 1) {
      setValue(1);
    }
  };
  const handleAddToCart = async (event) => {
    event.preventDefault();

    if (activeButton === null) {
      toast.warning('Vui lòng chọn kích thước trước khi thêm vào giỏ hàng.');
      return;
    }

    if (value < 1) {
      toast.warning('Vui lòng chọn số lượng hợp lệ trước khi thêm vào giỏ hàng.');
      return;
    }

    const itemSize = food.itemSizes[activeButton].id;

    const data = {
      itemSizes: [
        {
          itemSizeId: itemSize,
          quantity: value,
        },
      ],
    };

    // Tiếp tục với quá trình thêm vào giỏ hàng
    const parent = event.currentTarget.closest('.action-center');
    const src = parent.querySelector('.hidden-image').src;
    const cart = document.querySelector('.cart-icon');

    const parTop = parent.getBoundingClientRect().top + window.scrollY;
    const parLeft = parent.getBoundingClientRect().left;

    const img = document.createElement('img');
    img.classList.add('img-product-fly');
    img.src = src;
    img.style.top = `${parTop}px`;
    img.style.left = `${parLeft + parent.offsetWidth - 50}px`;
    document.body.appendChild(img);

    setTimeout(() => {
      img.style.top = `${cart.getBoundingClientRect().top}px`;
      img.style.left = `${cart.getBoundingClientRect().left}px`;

      setTimeout(() => {
        img.remove();
        addToCart(data, value);
      }, 1000);
    }, 500);
  };

  const handleBuy = () => {
    if (activeButton === null) {
      toast.warning('Vui lòng chọn kích thước trước khi mua.');
      return;
    }
    if (value < 1) {
      toast.warning('Vui lòng chọn số lượng hợp lệ trước khi mua.');
      return;
    }
    const itemSize = food.itemSizes[activeButton].id;
    const data = {
      itemSizes: [
        {
          itemSizeId: itemSize,
          quantity: value,
        },
      ],
    };
    addToCart(data, value);
    navigate('/cart');
  };
  return (
    <div className="container-info">
      <div class="d-flex justify-content-between align-items-center">
        {/* check i18n isEn ? props.name_en : props.name_vn */}
        <p class="p-2 info-name">{food.name}</p>
        <ReactStars count={5} edit={false} value={food.rating} size={44} activeColor="#ffd700" isHalf={true} />
      </div>
      <div class="align-items-center">
        <p class="p-2 info-price">{price}</p>
      </div>
      <div class="align-items-center">
        <p class="p-2">{food.description}</p>
      </div>
      <div class="d-flex align-items-center">
        <p class="p-2 fw-bold">Thành phần chính: </p>
        <p>{food.ingredients.join(', ')}</p>
      </div>
      <div class="d-flex align-items-center">
        <p class="p-2 fw-bold">Đặc sản:</p>
        <p class="p-2">{food.regional}</p>
      </div>
      <div class="d-flex align-items-center">
        <p class="p-2 fw-bold">Thành phần dinh dưỡng: </p>
        <p>{food.ingredients.join(', ')}</p>
      </div>
      <Table scroll={{ x: 400 }} dataSource={[food]} columns={columns} pagination={false} />
      <div class="align-items-center">
        <span class="p-2 fw-bold">Chọn kích thước: </span>
        <div className="p-2 d-block">
          {food.itemSizes.map((itemSize, index) => (
            <ButtonPrimary key={index} isActive={activeButton === index} onClick={() => handleClick(index)}>
              {itemSize.size}
            </ButtonPrimary>
          ))}
        </div>
      </div>
      <div class="d-flex flex-row align-items-center action-center" style={{ marginTop: '12px' }}>
        <button
          className={`border-0  ${value <= 1 ? 'opacity-50' : ''}`}
          onClick={handleDecrease}
          disabled={value <= 1}
        >
          <img src={ICONS.minus} />
        </button>
        <input className="info-quantity no-spinners" value={value} onChange={handleChangeQuantity} type="number" />
        <button className="border-0" onClick={handleIncrease}>
          <img src={ICONS.plus} />
        </button>
        <ButtonPrimary style={{ marginLeft: '10px' }} className="" isActive={true} onClick={(event) => handleBuy()}>
          Mua
        </ButtonPrimary>
        <ButtonPrimary
          className="add-cart"
          style={{ width: '35%' }}
          isActive={true}
          onClick={(event) => handleAddToCart(event)}
        >
          Thêm vào giỏ hàng
          <img style={{ marginLeft: '10px' }} src={ICONS.cart_2} />
          <div style={{ display: 'none' }}>
            <img src={food.images[0]} className="hidden-image" />
          </div>
        </ButtonPrimary>
      </div>
      <div class="d-flex flex-row align-items-center" style={{ marginTop: '14px' }}>
        <span className="p-2 info-rcm-title">Những món ăn bạn có thể sẽ thích</span>
      </div>
      <div className="slide-container" style={{ margin: '0 12px' }}>
        <div>
          <ItemCarousel foodItems={foodItems} />
        </div>
      </div>
    </div>
  );
};

export default FoodInfo;
