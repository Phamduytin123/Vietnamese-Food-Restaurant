import React from 'react';
import './index.scss';
import { Modal } from 'antd';

const FootAccountCreate = () => {
  return <div>Foot</div>;
};

const AccountCreateModal = (props) => {
  const { isModalVisible, closeModal } = props;

  return (
    <Modal title="Tạo người dùng" visible={isModalVisible} onCancel={closeModal} footer={<FootAccountCreate />}>
      Tạo người dùng
    </Modal>
  );
};

export default AccountCreateModal;
