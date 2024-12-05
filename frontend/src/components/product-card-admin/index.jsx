import StarRatingComponent from 'react-star-rating-component';
import { IMAGES } from '../../constants/images';
import { useEffect, useState } from 'react';
import './index.scss';
import { Link } from 'react-router-dom';
import LoadingOverlay from '../../components/loading_overlay';
import { useNavigate } from 'react-router-dom';
const ProductCardAdmin = (props) => {
  const navigate = useNavigate();
  const { product } = props;
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setIsFavorite(product.isLike);
  }, [product]);
  const handleClickEdit = () => {
    navigate(`/food/${product.id}`);
  };
  return (
    <div className="product-card">
      <LoadingOverlay loading={loading} />
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
            className="ratings"
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
          <div className="price">
            <span className="current-price">{product.minPrice}</span>
          </div>

          <div className="actions-edit">
            <button className="edit-product" onClick={handleClickEdit}>
              Edit Product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardAdmin;
