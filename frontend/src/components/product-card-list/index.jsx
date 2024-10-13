import { MdPageview } from "react-icons/md";
import StarRatingComponent from "react-star-rating-component";
import { IMAGES } from "../../constants/images";
import { ICONS } from "../../constants/icons";
import { useState } from "react";
import "./index.scss";
const ProductCardList = (props) => {
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
    const cleanedPrice = price.replace(" VND", "").replace(/\./g, "");
    const minPrice = parseFloat(cleanedPrice);
    const discountedPrice = (minPrice * discount) / 100;
    const formattedPrice = discountedPrice.toLocaleString("vi-VN") + " VND";
    return formattedPrice;
  };

  return (
    <div className="product-card-list">
      <div className="product-image">
        <div className="icon-wrapper" onClick={toggleFavorite}>
          <img
            src={isFavorite ? ICONS.fill_heart : ICONS.hearts}
            alt="Wishlist"
          />
        </div>
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0]
              : IMAGES.img_product
          }
          alt={product.name}
          className="img-item"
        />
        <div className="label">
          <img src={IMAGES.label_hot} alt="Hot" className="label-background" />
          <span>HOT</span>
        </div>
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
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
                  <span
                    className="partial-star"
                    style={{ width: `${fraction * 100}%` }}
                  >
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
        {product.discount != 0 ? (
          <div className="pricing">
            <span className="discounted-price">
              {discountPrice(product.minPrice, product.discount)}
            </span>
            <span className="original-price">{product.minPrice}</span>
            <span className="discount">{product.discount}% Off</span>
          </div>
        ) : (
          <div className="pricing">
            <span className="discounted-price">{product.minPrice}</span>
            <span className="discount">Chưa áp dụng giảm giá</span>
          </div>
        )}
        <p className="description">{product.description}</p>
        <div className="buttons">
          <button className="btn-view">
            <MdPageview />
            View Item
          </button>
          <button className="btn-cart">
            <img src={ICONS.cart_2} alt="Add to Cart" />
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
