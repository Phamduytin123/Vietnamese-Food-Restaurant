import UploadModal from '../../../components/detect_modal/UploadModal';
import FoodImage from '../../../components/food/FoodImage';
import FoodInfo from '../../../components/food/FoodInfo';
import Reviews from '../../../components/review';
const FoodDetail = () => {
  return (
    <div>
      <div className="d-flex justify-content-center mt-10" style={{ marginTop: '40px' }}>
        <FoodImage />
        <FoodInfo />
      </div>
      <div className="d-flex justify-content-center">
        <Reviews />
      </div>
      <UploadModal />
    </div>
  );
};

export default FoodDetail;
