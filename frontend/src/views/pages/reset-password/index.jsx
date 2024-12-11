import { useState } from 'react';
import FormLogin from '../../../components/auth/formLogin';
import './index.scss';
import { ArrowRightOutlined } from '@ant-design/icons';
import orderAPI from '../../../api/orderAPI';
import Login from '../login';
import LoginAPI from '../../../api/LoginAPI';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [email, setEmail] = useState();
  const [textError, setTextError] = useState();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        email: email,
      };
      await LoginAPI.resetPassword(formData);
      toast.success('Yêu cầu tạo mới mật khẩu đã được gửi. Vui lòng kiểm tra email!');
    } catch (error) {
      toast.error('Email không tồn tại');
    }
  };
  return (
    <div className="d-flex justify-content-center align-items-center frame_wrapper">
      <div className="justify-content-center form-login">
        <div>
          <button className="tab_button actived w-100">Reset mật khẩu mới</button>
          <form className="form-data p-4">
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label text-color__black">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {textError && <p className="text-danger">{textError}</p>}
            </div>
            <button
              className="btn btn-primary border-0 w-100 mt-2"
              style={{ background: '#FA8232' }}
              type="submit"
              onClick={handleSubmit}
            >
              GỬI EMAIL
              <ArrowRightOutlined className="ms-2" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
