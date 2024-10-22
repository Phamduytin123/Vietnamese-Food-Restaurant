import StarRatingComponent from 'react-star-rating-component';
import { IMAGES } from '../../constants/images';
import { ICONS } from '../../constants/icons';
import { useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
const ProductCardGrid = (props) => {
  const { product } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      console.log(`Product ${product.id} added to favorites`);
    } else {
      console.log(`Product ${product.id} removed from favorites`);
    }
  };
  const discountPrice = (price, discount) => {
    const cleanedPrice = price.replace(' VND', '').replace(/\./g, '');
    const minPrice = parseFloat(cleanedPrice);
    const discountedPrice = (minPrice * discount) / 100;
    const formattedPrice = discountedPrice.toLocaleString('vi-VN') + ' VND';
    return formattedPrice;
  };
  return (
    <div className="product-card">
      <div className="label">
        <img src={IMAGES.label_hot} alt="Hot" className="label-background" />
        <span>HOT</span>
      </div>
      <Link to={`/food/${product.id}`}>
        <img
          src={product.images && product.images.length > 0 ? product.images[0] : IMAGES.img_product}
          alt={product.name}
          className="product-image"
        />
      </Link>

      <div className="product-details">
        <div className="rate">
          <h3 className="product-name">{product.name}</h3>
          <StarRatingComponent
            className="rating"
            name="rating" // Tên của rating, có thể là bất kỳ chuỗi nào
            value={product.rating} // Ví dụ: rating hiện tại là 3 sao
            starCount={5} // Số sao trong rating
            onStarClick={() => {}} // Bỏ qua vì không cần xử lý khi không chỉnh sửa
            starColor="gold" // Màu sao đã chọn
            editing={false} // Không cho phép chỉnh sửa
            renderStarIcon={(nextValue, currentValue) => {
              if (nextValue <= Math.floor(product.rating)) {
                // Sao đầy đủ
                return <span className="custom-star full">&#9733;</span>;
              } else if (nextValue === Math.ceil(product.rating)) {
                // Sao một phần
                const fraction = product.rating - Math.floor(product.rating); // Tính phần thập phân
                return (
                  <span className="custom-star partial">
                    <span className="partial-star" style={{ width: `${fraction * 100}%` }}>
                      &#9733;
                    </span>
                    <span className="empty-star">&#9733;</span>
                  </span>
                );
              } else {
                // Sao trống
                return <span className="custom-star empty">&#9733;</span>;
              }
            }}
          />
        </div>
        {product.discount != 0 ? (
          <div className="price">
            <span className="current-price">{discountPrice(product.minPrice, product.discount)}</span>
            <div className="original-price">
              <span className="strikethrough">{product.minPrice}</span>
              <span className="discount">{product.discount}% Off</span>
            </div>
          </div>
        ) : (
          <div className="price">
            <span className="current-price">{product.minPrice}</span>
            <div className="original-price">
              <span className="discount">Chưa áp dụng giảm giá</span>
            </div>
          </div>
        )}
      </div>
      <div className="actions">
        <div className="icon-wrapper">
          <img src={ICONS.cart_2} alt="Add to Cart" />
        </div>
        <div className="icon-wrapper" onClick={toggleFavorite}>
          <img src={isFavorite ? ICONS.fill_heart : ICONS.hearts} alt="Wishlist" />
        </div>
      </div>
    </div>
  );
};

export default ProductCardGrid;
