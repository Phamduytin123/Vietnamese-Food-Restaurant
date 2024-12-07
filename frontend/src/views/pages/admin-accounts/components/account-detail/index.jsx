import React from 'react';
import './index.scss';
import { Button, Modal, Switch } from 'antd';
import { FormOutlined } from '@ant-design/icons';
import { ICONS } from '../../../../../constants/icons';
import { darkenColor, formatDateNormal } from '../../../../../utils/string';
import { ACCOUNTROLE, ACCOUNTROLECOLOR } from '../../../../../constants/enum';

const FootAccountDetail = ({ closeModal }) => {
  return (
    <div>
      <Button className="admin-account-detail-modal-exist-button" onClick={closeModal}>
        Thoát
      </Button>
    </div>
  );
};

const AccountDetailModal = (props) => {
  const { isModalVisible, closeModal, data, onChangeAccountInfo, onActiveAccount } = props;

  return (
    <Modal
      title="Chi tiết người dùng"
      className="admin-account-detail-modal-container"
      visible={isModalVisible}
      onCancel={closeModal}
      footer={<FootAccountDetail closeModal={closeModal} />}
    >
      <div className="admin-account-detail-modal-item-container">
        <div className="admin-account-detail-modal-item">
          <img
            alt={`tài khoản người dùng ${data.id}`}
            className="admin-account-detail-modal-avatar"
            src={data.avatar}
          />
          <p className="admin-account-detail-modal-display-name">{data.displayName}</p>
        </div>
        <div>
          <Button icon={<FormOutlined />} onClick={() => onChangeAccountInfo(data)} />
        </div>
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Tên đầy đủ : </p>
          <p>{data.name}</p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Kích hoạt : </p>
          <Switch
            size="small"
            value={data.isActive}
            onClick={(status) => onActiveAccount(status, data)}
            style={{ background: data.isActive ? 'green' : 'gray' }}
          />
        </div>
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-12">
          <p className="admin-account-detail-modal-item-title">Địa chỉ : </p>
          <p>{data.address}</p>
        </div>
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Email : </p>
          <p>{data.email}</p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Số điện thoại : </p>
          <p>{data.tel}</p>
        </div>
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Email : </p>
          <p>{data.email}</p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Giới tính : </p>
          <img alt="gender icon" style={{ width: 30, height: 30 }} src={ICONS[data.gender]} />
        </div>
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Vai trò : </p>
          <p
            className="admin-account-detail-modal-item-role"
            style={{ background: ACCOUNTROLECOLOR[data.role], color: darkenColor(ACCOUNTROLECOLOR[data.role]) }}
          >
            {ACCOUNTROLE[data.role]}
          </p>
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Ngày tạo : </p>
          <p>{formatDateNormal(data.createdAt)}</p>
        </div>
      </div>
    </Modal>
  );
};

export default AccountDetailModal;
