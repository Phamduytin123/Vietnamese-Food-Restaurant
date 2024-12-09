import React from 'react';
import './index.scss';
import { Modal, Form, Input, Button, Select } from 'antd';
import accountAPI from '../../../../../api/accountAPI';
import { toast } from 'react-toastify';
import ButtonPrimary from '../../../../../components/button/ButtonPrimary';
const { Option } = Select;

const AccountCreateModal = (props) => {
  const { isModalVisible, closeModal, callAPI } = props;
  const [form] = Form.useForm();

  const FootAccountCreate = ({ onSubmit }) => {
    return (
      <div className="modal-footer">
        <ButtonPrimary isActive={true} onClick={onSubmit}>
          Tạo tài khoản
        </ButtonPrimary>
      </div>
    );
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();

      const res = await accountAPI.adminCreateStaffAccount(values);
      callAPI();
      toast.success('Tạo tài khoản nhân viên thành công');

      closeModal();
    } catch (error) {
      toast.error('Đã có lỗi xảy ra, hãy kiểm tra lại thông tin đăng ký');
    }
  };
  return (
    <Modal visible={isModalVisible} onCancel={closeModal} footer={<FootAccountCreate onSubmit={handleSubmit} />}>
      <h5 style={{ color: '#FA8232', marginBottom: '20px', fontWeight: '550', fontSize: '24px' }}>
        Tạo tài khoản cho nhân viên
      </h5>
      <Form form={form} layout="vertical">
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Vui lòng nhập email!' },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input placeholder="Nhập email" />
        </Form.Item>
        <Form.Item
          label="Tên người dùng"
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
        >
          <Input placeholder="Nhập tên người dùng" />
        </Form.Item>

        <Form.Item
          label="Tên hiển thị"
          name="displayName"
          rules={[{ required: true, message: 'Vui lòng nhập tên người dùng!' }]}
        >
          <Input placeholder="Nhập tên người dùng" />
        </Form.Item>

        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}>
          <Input placeholder="Nhập địa chỉ người dùng" />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="tel"
          rules={[
            { required: true, message: 'Vui lòng nhập số điện thoại!' },
            { pattern: /^[0-9]{10,11}$/, message: 'Số điện thoại không hợp lệ!' },
          ]}
        >
          <Input placeholder="Nhập số điện thoại" />
        </Form.Item>

        <Form.Item label="Giới tính" name="gender" rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}>
          <Select placeholder="Chọn giới tính">
            <Option value="male">Nam</Option>
            <Option value="female">Nữ</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
          <Input.Password placeholder="Nhập mật khẩu" />
        </Form.Item>

        <Form.Item
          label="Xác nhận mật khẩu"
          name="confirm_password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu không khớp!'));
              },
            }),
          ]}
        >
          <Input.Password placeholder="Nhập lại mật khẩu" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AccountCreateModal;
