import { useRef, useState } from 'react';
import UserSidebar from '../../../components/sidebar/UserSidebar';
import './index.scss';
import ButtonPrimary from '../../../components/button/ButtonPrimary';
import { useEffect } from 'react';
import { Avatar } from 'antd';
import accountAPI from '../../../api/accountAPI';
import { toast } from 'react-toastify';
import PasswordInput from '../../../components/input/PasswordInput';

const AccountDetail = () => {
  const [account, setAccount] = useState(JSON.parse(localStorage.getItem('user_info')));
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const fileInputRef = useRef(null);
  const [avatar, setAvatar] = useState();
  const [formData, setFormData] = useState({
    displayName: '',
    name: '',
    address: '',
    gender: '',
    email: '',
    phoneNumber: '',
  });

  const [formUpdatePass, setFormUpdatePass] = useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });
  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      // Gọi API để lưu thông tin
      const item = await accountAPI.userUpdateAccount(formData);
      const updatedFields = item.data;
      const currentUserInfo = JSON.parse(localStorage.getItem('user_info')) || {};
      const updatedUserInfo = { ...currentUserInfo, ...updatedFields };
      localStorage.setItem('user_info', JSON.stringify(updatedUserInfo));
      setAccount(updatedUserInfo);
      toast.success('Cập nhật thông tin tài khoản thành công!');
      // await apiCall(formData); // Thay bằng API thực tế
    } catch (error) {
      toast.error('Đã có lỗi xảy ra xin vui lòng thử lại!');

      restoreData();
    } finally {
      setIsEditing(false);
    }
  };
  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file); // Assuming the field is 'images' for the avatar

      // API request to update the avatar
      const response = await accountAPI.userUpdateAccount(formData);

      const updatedFields = response.data;
      const currentUserInfo = JSON.parse(localStorage.getItem('user_info')) || {};
      const updatedUserInfo = { ...currentUserInfo, ...updatedFields };

      // Update the avatar in localStorage as well
      localStorage.setItem('user_info', JSON.stringify(updatedUserInfo));

      // Set the new avatar to the state
      setAvatar(updatedFields.avatar); // Assuming 'avatar' is the field returned by API

      toast.success('Cập nhật ảnh đại diện thành công!');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Đã có lỗi xảy ra khi cập nhật ảnh!');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file); // Call the uploadImage function with the selected file
    }
  };

  const restoreData = () => {
    setFormData({
      displayName: account.displayName,
      name: account.name,
      address: account.address,
      gender: account.gender,
      email: account.email,
      tel: account.tel,
    });
    setIsEditing(false);
  };
  const loadFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loadFormUpdatePass = (e) => {
    const { name, value } = e.target;
    setFormUpdatePass((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    restoreData();
  }, [account]);

  return (
    <div className="account-detail">
      <div className="d-flex justify-content-center">
        <UserSidebar activedLabel={4} />
        <div style={{ width: '60%' }}>
          <div className="account-detail-container">
            <div className="account-detail-setting">
              <div className="account-detail--title">
                <h5>CÀI ĐẶT TÀI KHOẢN</h5>
              </div>
              <div className="d-flex account-detail-info">
                <div className="account-detail--img">
                  <Avatar size={164} src={avatar || formData.avatar} />
                  <ButtonPrimary style={{ margin: '8px 0', padding: '6px' }} isActive={true}>
                    <label htmlFor="file-upload" style={{ cursor: 'pointer' }}>
                      Thay đổi ảnh
                    </label>
                    {/* Hidden file input */}
                    <input
                      id="file-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: 'none' }} // Hide the input element
                    />
                  </ButtonPrimary>
                </div>
                <div className="d-flex justify-content-between w-100 ms-5">
                  <div className="account-detail--item">
                    <div className="d-flex flex-column mb-3 mb-3">
                      <label htmlFor="">Tên hiển thị</label>
                      <input
                        name="displayName"
                        value={formData.displayName}
                        onChange={loadFormData}
                        disabled={!isEditing}
                      />
                    </div>
                    <div className="d-flex flex-column mb-3">
                      <label htmlFor="">Họ và tên</label>
                      <input name="name" value={formData.name} onChange={loadFormData} disabled={!isEditing} />
                    </div>
                    <div className="d-flex flex-column mb-3">
                      <label htmlFor="">Địa chỉ</label>
                      <input name="address" value={formData.address} onChange={loadFormData} disabled={!isEditing} />
                    </div>
                  </div>
                  <div className="account-detail--item">
                    <div className="d-flex flex-column mb-3">
                      <label htmlFor="">Giới tính</label>
                      <input name="gender" value={formData.gender} onChange={loadFormData} disabled={!isEditing} />
                    </div>
                    <div className="d-flex flex-column mb-3">
                      <label htmlFor="">Email</label>
                      <input name="email" value={formData.email} onChange={loadFormData} disabled={!isEditing} />
                    </div>
                    <div className="d-flex flex-column mb-3">
                      <label htmlFor="">Số điện thoại</label>
                      <input name="tel" value={formData.tel} onChange={loadFormData} disabled={!isEditing} />
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-end p-3">
                  {isEditing ? (
                    <div>
                      <ButtonPrimary isActive={true} onClick={handleSave}>
                        Lưu thay đổi
                      </ButtonPrimary>
                      <ButtonPrimary isActive={true} onClick={restoreData}>
                        Hủy bỏ thay đổi
                      </ButtonPrimary>
                    </div>
                  ) : (
                    <ButtonPrimary isActive={true} onClick={handleEditToggle}>
                      Chỉnh sửa thông tin
                    </ButtonPrimary>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="account-detail-container mt-5">
            <div className="account-detail--title">
              <h5>THAY ĐỔI MẬT KHẨU</h5>
            </div>
            <div className="p-3">
              <PasswordInput
                name="current_password"
                label="Mật khẩu hiện tại"
                value={formUpdatePass.current_password}
                onChange={loadFormUpdatePass}
                disabled={!isEditingPassword}
                style={{ padding: '8px' }}
              />
              <PasswordInput
                name="new_password"
                label="Mật khẩu mới"
                value={formUpdatePass.new_password}
                onChange={loadFormUpdatePass}
                style={{ padding: '8px' }}
                disabled={!isEditingPassword}
              />
              <PasswordInput
                name="confirm_password"
                label="Nhập lại mật khẩu mới"
                value={formUpdatePass.confirm_password}
                onChange={loadFormUpdatePass}
                style={{ padding: '8px' }}
                disabled={!isEditingPassword}
              />
              <div className="d-flex justify-content-end ">
                {isEditingPassword ? (
                  <div>
                    <ButtonPrimary isActive={true} onClick={() => setIsEditingPassword(false)}>
                      Đổi mật khẩu
                    </ButtonPrimary>
                    <ButtonPrimary isActive={true} onClick={() => setIsEditingPassword(false)}>
                      Hủy bỏ thay đổi
                    </ButtonPrimary>
                  </div>
                ) : (
                  <ButtonPrimary isActive={true} onClick={() => setIsEditingPassword(true)}>
                    Chỉnh sửa mật khẩu
                  </ButtonPrimary>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetail;
