import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import UploadModal from '../../../components/detect_modal/UploadModal';
import FoodImage from '../../../components/food/FoodImage';
import FoodInfo from '../../../components/food/FoodInfo';
import Reviews from '../../../components/review';
import ProductDetailAPI from '../../../api/ProductDetailAPI';
const FoodDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const fetchProduct = async () => {
    try {
      const item = await ProductDetailAPI.getProduct(id);
      setProduct(item.data);
      console.log('Food Update', item);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <div>
      {product && (
        <div>
          <div className="d-flex justify-content-center mt-10" style={{ marginTop: '40px' }}>
            <FoodImage images={product.images} />
            <FoodInfo food={product} />
          </div>
          <div className="d-flex justify-content-center">
            <Reviews />
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodDetail;
