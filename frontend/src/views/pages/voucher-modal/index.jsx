import React, { useState } from 'react';
import Modal from 'react-modal';
import './index.scss';

Modal.setAppElement('#root');

const VoucherModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      {/* Nút mở modal */}
      <button onClick={() => setModalIsOpen(true)}>Open Voucher Modal</button>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>Thông Tin Voucher</h2>
        <form className="voucher-form">
          <div className="form-group">
            <label>Mã Voucher</label>
            <input type="text" placeholder="XALMAXP" />
          </div>
          <div className="form-grid">
            <div className="form-group-voucher">
              <label>Tên Voucher</label>
              <input type="text" placeholder="SALE MONTHS" />
            </div>
            <div className="form-group-discount">
              <label>Giảm giá</label>
              <input type="text" placeholder="50%" />
            </div>
            <div className="form-group-cost">
              <label>Giá áp dụng (Tối thiểu)</label>
              <input type="email" placeholder="" />
            </div>
            <div className="form-group-count">
              <label>Số lượng</label>
              <input type="text" placeholder="50" />
            </div>
            <div className="form-group-startDate">
              <label>Ngày bắt đầu</label>
              <input type="text" placeholder="" />
            </div>
            <div className="form-group-endDate">
              <label>Ngày kết thúc</label>
              <input type="text" placeholder="" />
            </div>
          </div>
          <div className="button">
            <button className="save-button" type="submit">
              Lưu Thay Đổi
            </button>
            <button className="close-button" onClick={() => setModalIsOpen(false)}>
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default VoucherModal;
