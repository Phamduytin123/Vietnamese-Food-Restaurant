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
    <div className="food-carousel">
      <button onClick={prevItems}>
        <img src={ICONS.arrow_left} alt="arrow left" />
      </button>
      <div className="items-container">
        {foodItems.slice(currentIndex, currentIndex + itemsToShow).map((item, index) => (
          <div className="food-item" key={index}>
            <img src={item.image} alt={item.name} />
            <h5>{item.name}</h5>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
      <button onClick={nextItems}>
        <img src={ICONS.arrow_right} alt="arrow right" />
      </button>
    </div>
  );
};

export default ItemCarousel;
