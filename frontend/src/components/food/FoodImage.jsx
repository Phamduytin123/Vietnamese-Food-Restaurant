import { IMAGES } from '../../constants/images';
import { useState } from 'react';
import ImageCarousel from './ImageCarous';

const FoodImage = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };
  return (
    <div className="food-images">
      <div className="food-image">
        <img
          className="border-radius-16"
          style={{ padding: '16px', width: '100%', borderRadius: '36px', minHeight: '410px', objectFit: 'cover' }}
          src={images[currentImageIndex]}
          alt=""
        />
      </div>
      <div className="food-image-view">
        <ImageCarousel foodImages={images} onImageClick={handleImageClick} />
      </div>
    </div>
  );
};
export default FoodImage;
