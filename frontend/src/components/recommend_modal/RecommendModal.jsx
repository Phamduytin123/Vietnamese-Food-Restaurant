import './RecommendModal.scss';
import { useState, useRef } from 'react';
import Modal from 'react-modal';
import { IMAGES } from '../../constants/images';
import ButtonPrimary from '../button/ButtonPrimary';
import ClipLoader from 'react-spinners/ClipLoader';
import modalStyles, { modalRecommendStyle } from '../detect_modal/constant';
import { ICONS } from '../../constants/icons';
import modelAPI from '../../api/modelAPI';
import ProductCardGrid from '../product-card-grid';

const RecommendModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState(false);
  const [foodsInfo, setFoodsInfo] = useState([]);
  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  const fetchRecommendAPI = async () => {
    setLoading(true);
    const calories = document.getElementById('calories').value || 0;
    const fat = document.getElementById('fat').value || 0;
    const carbohydrates = document.getElementById('carbohydrates').value || 0;
    const protein = document.getElementById('protein').value || 0;
    const cholesterol = document.getElementById('cholesterol').value || 0;
    const sodium = document.getElementById('sodium').value || 0;
    const fiber = document.getElementById('fiber').value || 0;
    const ingredients = document.getElementById('ingredients').value.split(',');

    try {
      const payload = {
        input_features: {
          carbohydrates: parseFloat(carbohydrates),
          protein: parseFloat(protein),
          cholesterol: parseFloat(cholesterol),
          sodium: parseFloat(sodium),
          fiber: parseFloat(fiber),
        },
        list_ingredients: ingredients,
      };
      setTimeout(async () => {
        const response = await modelAPI.recommend(payload);
        setFoodsInfo(response.data);
        setLoading(false);
        setModalInfo(true);
      }, 1000);

      // Đóng modal sau khi tải lên thành công
      // closeModal();
    } catch (error) {
      console.error('Upload failed:', error);
      setLoading(false);
    }
  };
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <button className="option-button" onClick={openModal}>
        <img src={ICONS.lightbulb} alt="Lightbulb" />
        <span>Gợi ý đồ ăn</span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
        overlayClassName="overlay"
      >
        <div>
          <p className="modal-title">Entering nutritional compositions & ingredients</p>
          <form id="form" className="d-flex justify-content-between" encType="multipart/form-data">
            <div className="form-input-container d-flex flex-column">
              <p>Calories</p>
              <input type="text" id="calories" placeholder="calories" />
              <p>Fat</p>
              <input type="text" id="fat" placeholder="fat" />
              <p>Carbohydrates</p>
              <input type="text" id="carbohydrates" placeholder="carbohydrates" />
              <p>Protein</p>
              <input type="text" id="protein" placeholder="protein" />
            </div>
            <div className="form-input-container d-flex flex-column">
              <p>Cholesterol</p>
              <input type="text" id="cholesterol" placeholder="cholesterol" />
              <p>Sodium</p>
              <input type="text" id="sodium" placeholder="sodium" />
              <p>Fiber</p>
              <input type="text" id="fiber" placeholder="fiber" />
              <p>Ingredients</p>
              <input type="text" id="ingredients" placeholder="ingredients" />
            </div>
          </form>

          <div className="mt-4 d-flex justify-content-end">
            <ButtonPrimary onClick={closeModal}>Cancel</ButtonPrimary>
            <ButtonPrimary st yle={{ marginRight: '0' }} isActive={true} onClick={fetchRecommendAPI}>
              Done
            </ButtonPrimary>
          </div>
        </div>
      </Modal>
      {loading && (
        <div className="overlay1">
          <div className="d-flex justify-content-center position-absolute loading">
            <ClipLoader size={50} color={'#000000'} loading={loading} />
          </div>
        </div>
      )}
      {modalInfo && (
        <Modal
          isOpen={modalInfo}
          onRequestClose={() => {
            setModalInfo(false);
          }}
          style={modalRecommendStyle}
          contentLabel="Example Modal"
          overlayClassName="overlay"
        >
          <p className="modal-title">Các món ăn được gợi ý dựa trên thành phần: </p>
          <div className="product-card-container-horizontal">
            {foodsInfo.map((product) => (
              <div key={product.id} className="product-card-grid">
                <ProductCardGrid product={product} />
              </div>
            ))}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default RecommendModal;
