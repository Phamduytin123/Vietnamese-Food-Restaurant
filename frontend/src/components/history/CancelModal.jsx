import Modal from 'react-modal';
import ButtonPrimary from '../button/ButtonPrimary';
import modalStyles, { ratingModalStyles } from '../detect_modal/constant';
import { useRef, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import './RatingModal.scss';
import orderAPI from '../../api/orderAPI';
import { toast } from 'react-toastify';

const CancelModal = ({ orderId }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState();
  const [isSubmitted, setIsSubmitted] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    createCancel();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const createCancel = async () => {
    try {
      const formData = {
        reasonCancel: reason,
        id: orderId,
      };
      const item = await orderAPI.cancelOrder(formData);
      setIsSubmitted(true);
      setIsOpen(false);
      toast.success('Đã yêu cầu hủy đơn hàng!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi yêu cầu hủy đơn hàng. Vui lòng thử lại!');
    }
  };

  return (
    <div>
      <ButtonPrimary style={{ margin: '0px', backgroundColor: 'red' }} isActive={true} onClick={openModal}>
        Hủy đơn hàng
      </ButtonPrimary>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ratingModalStyles}
        contentLabel="Example Modal"
        overlayClassName="overlay"
      >
        <div className="rating-modal">
          <p className="modal-title">Yêu cầu hủy đơn hàng</p>
          <form id="form" className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
            <div className="form-input-container w-100">
              <textarea
                name="reason"
                className="feedback-input w-100"
                placeholder="Viết lí do hủy đơn hàng của bạn..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={isSubmitted}
              />
            </div>

            <div className="w-100 d-flex justify-content-center">
              <ButtonPrimary
                isActive={!isSubmitted}
                style={{ marginRight: '0px', width: '50%', backgroundColor: 'red' }}
                isDisable={isSubmitted}
                type="submit"
              >
                Chắc chắn hủy đơn
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CancelModal;
