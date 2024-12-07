import React from 'react';
import './index.scss';
import { Modal } from 'antd';

const FootAccountUpdate = () => {
  return <div>Foot</div>;
};

const AccountUpdateModal = (props) => {
  const { isModalVisible, closeModal, data } = props;

  return (
    <Modal title="Cập nhập người dùng" visible={isModalVisible} onCancel={closeModal} footer={<FootAccountUpdate />}>
      Cập nhập người dùng
    </Modal>
  );
};

export default AccountUpdateModal;
