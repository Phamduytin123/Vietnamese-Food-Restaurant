import { Carousel } from 'antd';
import './WishlistCard.scss';
import ItemCarousel from '../food/ItemCarousel';

const WishlistCard = ({ dataSource }) => {
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
  ];

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
