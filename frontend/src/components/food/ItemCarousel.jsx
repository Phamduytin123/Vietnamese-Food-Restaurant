import { ICONS } from '../../constants/icons';
import styles from './Food.scss';

import React, { useState } from 'react';

const ItemCarousel = ({ foodItems }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 4;

  const nextItems = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (foodItems.length - itemsToShow + 1));
  };

  const prevItems = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + (foodItems.length - itemsToShow + 1)) % (foodItems.length - itemsToShow + 1),
    );
  };

  return (
    <div className="food-carousel-wish">
      <button onClick={prevItems}>
        <img src={ICONS.arrow_left} alt="arrow left" />
      </button>
      <div className="items-container-wish">
        {foodItems.slice(currentIndex, currentIndex + itemsToShow).map((item, index) => {
          return (
            <div className="food-item-wish" key={index}>
              <div className="d-flex flex-column align-items-center">
                <img src={item.images[index]} alt={item.name} style={{ width: '200px', height: '150px' }} />
                <span className="fw-normal">{item.name}</span>
              </div>
              <p>{item.description}</p>
            </div>
          );
        })}
      </div>
      <button onClick={nextItems}>
        <img src={ICONS.arrow_right} alt="arrow right" />
      </button>
    </div>
  );
};

export default ItemCarousel;
