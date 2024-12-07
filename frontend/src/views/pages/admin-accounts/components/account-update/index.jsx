import React, { useEffect, useState } from 'react';
import './index.scss';
import { Button, Image, Input, Modal, Select, Switch } from 'antd';
import { darkenColor, formatDateNormal } from '../../../../../utils/string';
import { ACCOUNTROLE, ACCOUNTROLECOLOR } from '../../../../../constants/enum';
import { ICONS } from '../../../../../constants/icons';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';

const FootAccountUpdate = () => {
  return <div>Foot</div>;
};

const AccountUpdateModal = (props) => {
  const { isModalVisible, closeModal } = props;
  const [data, setData] = useState(props.data);
  const [name, setName] = useState(data.name);
  const [displayName, setDisplayName] = useState(data.displayName);
  const [address, setAddress] = useState(data.address);
  const [gender, setGender] = useState(data.gender);
  const [tel, setTel] = useState(data.tel);
  const [isActive, setIsActive] = useState(data.isActive);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      // AccountAPI.updateAvatar(formData)
      //   .then((res) => {
      //     setUser({ ...user, avatar: res.data.data });
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
    }
  };

  const onChangeData = (newData) => {
    setData({ ...data, ...newData });
  };

  useEffect(() => {
    onChangeData({
      name,
      displayName,
      address,
      gender,
      tel,
      isActive,
    });
  }, [name, displayName, address, gender, tel, isActive]);

  return (
    <Modal title="Cập nhập người dùng" visible={isModalVisible} onCancel={closeModal} footer={<FootAccountUpdate />}>
      <div className="admin-account-detail-modal-item-container">
        <div className="admin-account-detail-modal-item">
          <Image
            alt={`tài khoản người dùng ${data.id}`}
            className="admin-account-detail-modal-avatar"
            src={data.avatar} // Hiển thị ảnh xem trước hoặc ảnh mặc định
          />
        </div>
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Tên đầy đủ : </p>
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập vào tên đầy đủ" />
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Tên hiển thị : </p>
          <Input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="Nhập vào tên hiển thị"
          />
        </div>
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <p className="admin-account-detail-modal-item-title">Địa chỉ : </p>
        <TextArea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Nhập vào địa chỉ"
          autoSize={{ minRows: 3, maxRows: 5 }}
          count={{
            show: true,
            max: 254,
          }}
        />
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Email : </p>
          <Input value={data.email} placeholder="Nhập vào email" disabled={true} />
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Số điện thoại : </p>
          <Input value={tel} onChange={(e) => setTel(e.target.value)} placeholder="Nhập vào số điện thoại" />
        </div>
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Kích hoạt : </p>
          <Switch
            size="big"
            checked={isActive}
            onChange={(status) => setIsActive(status)}
            style={{ background: isActive ? 'green' : 'gray' }}
          />
        </div>
        <div className="col-lg-6 col-sm-12">
          <p className="admin-account-detail-modal-item-title">Giới tính : </p>
          <Select
            value={gender} // Giá trị hiện tại của select box
            onChange={(value) => setGender(value)} // Cập nhật state khi thay đổi
            placeholder="Chọn giới tính"
            style={{ width: '100%' }}
          >
            <Select.Option value="male">
              <span>
                <img alt="gender icon" style={{ width: 30, height: 30 }} src={ICONS['male']} /> Nam
              </span>
            </Select.Option>
            <Select.Option value="female">
              <span>
                <img alt="gender icon" style={{ width: 30, height: 30 }} src={ICONS['female']} /> Nữ
              </span>
            </Select.Option>
          </Select>
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

export default AccountUpdateModal;
