import './RecommendModal.scss';
import { useState, useRef } from 'react';
import Modal from 'react-modal';
import { IMAGES } from '../../constants/images';
import ButtonPrimary from '../button/ButtonPrimary';
import ClipLoader from 'react-spinners/ClipLoader';
import modalStyles from '../detect_modal/constant';
import { ICONS } from '../../constants/icons';

const RecommendModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  const fileUploadRef = useRef();

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
            <ButtonPrimary style={{ marginRight: '0' }} isActive={true} onClick={closeModal}>
              Done
            </ButtonPrimary>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default RecommendModal;
