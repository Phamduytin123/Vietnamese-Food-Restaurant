import styles from './Food.scss';

import ReactStars from 'react-rating-stars-component';
import { useEffect, useState } from 'react';
import { Table } from 'antd';
import { columns } from './constant';
import { ICONS } from '../../constants/icons';
import ButtonPrimary from '../button/ButtonPrimary';
import ItemCarousel from './ItemCarousel';
const props = {
  id: 1,
  name_vi: 'Gà Rán',
  name_en: 'Fried Chicken',
  discount: 10,
  calories: 250,
  price: 30000,
  fat: 15,
  carbohydrates: 10,
  protein: 20,
  cholesterol: 70,
  sodium: 500,
  fiber: 2,
  categoryId: 1,
  description: `
    Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon.
    Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon.
    Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon.
    Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon. Gà rán giòn
    `,
  description: 'Crispy and delicious fried chicken.',
  availability: 'AVAILABLE', // Assuming ItemAvailabilityEnum has values like AVAILABLE, UNAVAILABLE, etc.
  rating: 4.5,
  ingredients: ['gà', 'bột mì', 'gia vị'],
  ingredients_en: JSON.stringify(['chicken', 'flour', 'spices']),
  unit: 'phần',
  unit_en: 'serving',
  images: JSON.stringify(['image1.jpg', 'image2.jpg']),
  regional: 'Miền Nam', // Assuming regional refers to the geographic region
  isFood: true,
  isDeleted: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

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
  console.log('Food Info:', food);
  const [activeButton, setActiveButton] = useState(null); // State to track active button
  const [price, setPrice] = useState(food.minPrice);

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
      <div class="d-flex flex-row align-items-center" style={{ marginTop: '12px' }}>
        <button
          className={`border-0  ${value <= 1 ? 'opacity-50' : ''}`}
          onClick={handleDecrease}
          disabled={value <= 0}
        >
          <img src={ICONS.minus} />
        </button>
        <input className="info-quantity no-spinners" value={value} onChange={handleChangeQuantity} type="number" />
        <button className="border-0" onClick={handleIncrease}>
          <img src={ICONS.plus} />
        </button>
        <ButtonPrimary style={{ marginLeft: '10px' }} className="" isActive={true}>
          Mua
        </ButtonPrimary>
        <ButtonPrimary style={{ width: '35%' }} isActive={true}>
          Thêm vào giỏ hàng
          <img style={{ marginLeft: '10px' }} src={ICONS.cart} />
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
