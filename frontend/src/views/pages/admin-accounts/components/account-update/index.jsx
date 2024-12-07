import React, { useState, useRef } from 'react';
import './index.scss';
import { Button, Image, Input, Modal, Select, Switch } from 'antd';
import { darkenColor, formatDateNormal } from '../../../../../utils/string';
import { ACCOUNTROLE, ACCOUNTROLECOLOR } from '../../../../../constants/enum';
import { ICONS } from '../../../../../constants/icons';
import TextArea from 'antd/es/input/TextArea';
import { UploadOutlined } from '@ant-design/icons';
import UploadImageAPI from '../../../../../api/uploadImageAPI';
import { toast } from 'react-toastify';
import accountAPI from '../../../../../api/accountAPI';

const FootAccountUpdate = ({ closeModal, onUpdateAccountModel }) => {
  return (
    <div>
      <Button className="admin-update-modal-cancel-btn" onClick={closeModal}>
        Hủy
      </Button>
      <Button className="admin-update-modal-update-btn" onClick={onUpdateAccountModel}>
        Cập nhập
      </Button>
    </div>
  );
};

const AccountUpdateModal = (props) => {
  const { isModalVisible, closeModal, onUpdateAccount, data } = props;
  const [name, setName] = useState(data.name);
  const [displayName, setDisplayName] = useState(data.displayName);
  const [address, setAddress] = useState(data.address);
  const [gender, setGender] = useState(data.gender);
  const [tel, setTel] = useState(data.tel);
  const [isActive, setIsActive] = useState(data.isActive);
  const [avatar, setAvatar] = useState(data.avatar);

  const avatarInputRef = useRef(null);

  const onChangeAvatar = () => {
    avatarInputRef.current.click();
  };

  const handleAvatarChange = async (event) => {
    try {
      const file = event.target.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('image', file);
        const res = await UploadImageAPI.uploadImage(formData);
        setAvatar(res.data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onUpdateAccountModel = async () => {
    // Kiểm tra các giá trị không được rỗng
    if (!name.trim()) {
      toast.error('Tên không được để trống.');
      return;
    }
    if (!displayName.trim()) {
      toast.error('Tên hiển thị không được để trống.');
      return;
    }
    if (!address.trim()) {
      toast.error('Địa chỉ không được để trống.');
      return;
    }
    if (!tel.trim()) {
      toast.error('Số điện thoại không được để trống.');
      return;
    }

    // Kiểm tra định dạng số điện thoại
    const phoneRegex = /^[0-9]{10,12}$/; // Số điện thoại chỉ được chứa từ 10-12 chữ số
    if (!phoneRegex.test(tel)) {
      toast.error('Số điện thoại không hợp lệ. Vui lòng nhập đúng định dạng (10-12 chữ số).');
      return;
    }

    const account = {
      ...data,
      name: name,
      gender: gender,
      displayName: displayName,
      address: address,
      tel: tel,
      isActive: isActive,
      avatar: avatar,
    };

    try {
      const res = await accountAPI.adminUpdateAccount(data.id, account);
      console.log(res);
    } catch (error) {
      toast.error(JSON.parse(error.request.responseText).message);
      return;
    }

    onUpdateAccount(account);
    closeModal();
  };

  return (
    <Modal
      title="Cập nhập người dùng"
      visible={isModalVisible}
      onCancel={closeModal}
      footer={<FootAccountUpdate closeModal={closeModal} onUpdateAccountModel={onUpdateAccountModel} />}
      width={900}
    >
      <div className="admin-account-detail-modal-item-container">
        <div className="admin-account-detail-modal-item flex-column">
          <Image alt={`tài khoản người dùng ${data.id}`} className="admin-account-detail-modal-avatar" src={avatar} />
          <Button onClick={onChangeAvatar} className="admin-account-update-modal-button-update-avatar">
            <p>Chỉnh sửa ảnh bìa</p>
            <UploadOutlined />
          </Button>
          {/* Hidden file input for background */}
          <input
            type="file"
            accept="image/*"
            ref={avatarInputRef}
            style={{ display: 'none' }}
            multiple={false}
            onChange={handleAvatarChange}
          />
        </div>
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-lg-6 col-sm-12">
          <div className="admin-update-modal-item-left">
            <p className="admin-account-detail-modal-item-title">Tên đầy đủ : </p>
            <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập vào tên đầy đủ" />
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <div className="admin-update-modal-item-right">
            <p className="admin-account-detail-modal-item-title">Tên hiển thị : </p>
            <Input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder="Nhập vào tên hiển thị"
            />
          </div>
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
          <div className="admin-update-modal-item-left">
            <p className="admin-account-detail-modal-item-title">Email : </p>
            <Input value={data.email} placeholder="Nhập vào email" disabled={true} />
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <div className="admin-update-modal-item-right">
            <p className="admin-account-detail-modal-item-title">Số điện thoại : </p>
            <Input value={tel} onChange={(e) => setTel(e.target.value)} placeholder="Nhập vào số điện thoại" />
          </div>
        </div>
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-lg-6 col-sm-12">
          <div className="admin-update-modal-item-left">
            <p className="admin-account-detail-modal-item-title">Kích hoạt : </p>
            <Switch
              size="big"
              checked={isActive}
              onChange={(status) => setIsActive(status)}
              style={{ background: isActive ? 'green' : 'gray' }}
            />
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <div className="admin-update-modal-item-right">
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
      </div>
      <div className="row align-items-center admin-account-detail-modal-item-container">
        <div className="col-lg-6 col-sm-12">
          <div className="admin-update-modal-item-left">
            <p className="admin-account-detail-modal-item-title">Vai trò : </p>
            <p
              className="admin-account-detail-modal-item-role"
              style={{ background: ACCOUNTROLECOLOR[data.role], color: darkenColor(ACCOUNTROLECOLOR[data.role]) }}
            >
              {ACCOUNTROLE[data.role]}
            </p>
          </div>
        </div>
        <div className="col-lg-6 col-sm-12">
          <div className="admin-update-modal-item-right">
            <p className="admin-account-detail-modal-item-title">Ngày tạo : </p>
            <p>{formatDateNormal(data.createdAt)}</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default AccountUpdateModal;
