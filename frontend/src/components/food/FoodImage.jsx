import { IMAGES } from '../../constants/images';
import ImageCarousel from './ImageCarous';

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
  description_vi: `
    Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon.
    Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon.
    Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon.
    Gà rán giòn tan, thơm ngon. Gà rán giòn tan, thơm ngon. Gà rán giòn
    `,
  description_en: 'Crispy and delicious fried chicken.',
  availability: 'AVAILABLE', // Assuming ItemAvailabilityEnum has values like AVAILABLE, UNAVAILABLE, etc.
  rating: 4.5,
  ingredients_vi: ['gà', 'bột mì', 'gia vị'],
  ingredients_en: JSON.stringify(['chicken', 'flour', 'spices']),
  unit_vi: 'phần',
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
    image: 'https://danangbest.com/upload_content/quan-pho-ngon-da-nang-2.webp',
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
    image: 'https://danangbest.com/upload_content/quan-pho-ngon-da-nang-2.webp',
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

const FoodImage = ({ images }) => {
  return (
    <div className="food-images">
      <div className="food-image">
        <img className="border-radius-16" style={{ padding: '40px', width: '100%' }} src={images[0]} alt="" />
      </div>
      <div className="food-image-view">
        <ImageCarousel foodImages={images} />
      </div>
    </div>
  );
};
export default FoodImage;
