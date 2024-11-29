import Modal from 'react-modal';
import ButtonPrimary from '../button/ButtonPrimary';
import modalStyles, { modalInfoStyle } from '../detect_modal/constant';
import { useState } from 'react';
import './RatingModal.scss';

const RatingModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [modalInfo, setModalInfo] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <ButtonPrimary style={{ margin: '0px' }} isActive={true} onClick={openModal}>
        Đánh giá ngay
      </ButtonPrimary>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
        overlayClassName="overlay"
      >
        <div>
          <p className="modal-title">Upload Image</p>
        </div>
      </Modal>
    </div>
  );
};

export default RatingModal;
