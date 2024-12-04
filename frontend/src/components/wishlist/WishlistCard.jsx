import { Carousel } from 'antd';
import './WishlistCard.scss';
import ItemCarousel from '../food/ItemCarousel';

const WishlistCard = ({ dataSource }) => {
  return (
    <div className="wishlist-container">
      <h5 className="wishlist-title">MÓN ĂN ĐÃ THÍCH</h5>
      <div className="p-3">
        <ItemCarousel foodItems={dataSource} />
      </div>
    </div>
  );
};

export default WishlistCard;
