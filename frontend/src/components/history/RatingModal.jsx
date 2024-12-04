import Modal from 'react-modal';
import ButtonPrimary from '../button/ButtonPrimary';
import modalStyles, { ratingModalStyles } from '../detect_modal/constant';
import { useRef, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import './RatingModal.scss';
import orderAPI from '../../api/orderAPI';
import { toast } from 'react-toastify';

const RatingModal = ({ record, action }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(record.review ? record.review.rating : 0);
  const [feedback, setFeedback] = useState(record.review ? record.review.comment : '');
  const [isSubmitted, setIsSubmitted] = useState(!!record.review); // Trạng thái gửi đánh giá

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const createReview = async () => {
    try {
      const formData = {
        comment: feedback,
        rating: rating,
        itemSizeId: record.itemSizeId,
        orderId: record.orderId,
      };
      const item = await orderAPI.reviewProduct(formData);
      action(record.itemSizeId, item.data);
      setIsSubmitted(true);
      setIsOpen(false);
      toast.success('Đánh giá của bạn đã được gửi thành công!');
    } catch (error) {
      toast.error('Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!');
    }
  };

  return (
    <div>
      <ButtonPrimary style={{ margin: '0px' }} isActive={true} onClick={openModal}>
        {isSubmitted ? 'Xem đánh giá' : 'Đánh giá'}
      </ButtonPrimary>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={ratingModalStyles}
        contentLabel="Example Modal"
        overlayClassName="overlay"
      >
        <div className="rating-modal">
          <p className="modal-title">Đánh giá sản phẩm</p>
          <form id="form" className="d-flex flex-column justify-content-center" onSubmit={handleSubmit}>
            <div className="form-input-container w-100 d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <img src={record.image} className="rating-item-image" alt={record.name} />
                <div className="d-flex flex-column align-items-start">
                  <span className="rating-item-text">
                    {record.name} ({record.size})
                  </span>
                </div>
              </div>
              <ReactStars
                count={5}
                value={rating}
                size={44}
                activeColor="#ffd700"
                edit={!isSubmitted} // Không cho chỉnh sửa nếu đã có đánh giá
                onChange={handleRatingChange}
              />
            </div>

            <div className="form-input-container w-100">
              <textarea
                name="feedback"
                className="feedback-input w-100"
                placeholder="Viết nhận xét của bạn..."
                value={feedback} // Gắn giá trị feedback vào textarea
                onChange={(e) => setFeedback(e.target.value)} // Cập nhật feedback khi thay đổi textarea
                disabled={isSubmitted} // Disable textarea nếu đã có đánh giá
              />
            </div>

            <div className="w-100 d-flex justify-content-center">
              <ButtonPrimary
                isActive={!isSubmitted}
                style={{ marginRight: '0px', width: '50%' }}
                isDisable={isSubmitted}
                type="submit"
              >
                {record.review ? 'Đã gửi đánh giá' : 'Gửi đánh giá'}
              </ButtonPrimary>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default RatingModal;
