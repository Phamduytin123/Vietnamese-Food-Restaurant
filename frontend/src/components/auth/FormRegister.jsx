import styles from './FormAuth.scss';
import { ICONS } from '../../constants/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PasswordInput from '../input/PasswordInput';

const FormRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [phoneNumber, setPhoneNumber] = useState(); // Thêm trạng thái cho số điện thoại
  const [textError, setTextError] = useState();

  const handleHidePassword = () => {
    setPassword((prevState) => !prevState);
  };

  return (
    <div className="justify-content-center form-login">
      <button
        className="tab_button"
        onClick={() => {
          navigate('/auth/login');
        }}
      >
        Đăng nhập
      </button>
      <button className="tab_button actived">Đăng kí</button>
      <form className="form-data p-4">
        <div className="form-group mb-3">
          <label htmlFor="name" className="form-label text-color__black">
            Tên
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nhập tên của bạn"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {textError && <p className="text-danger">{textError}</p>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label text-color__black">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Nhập email của bạn"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {textError && <p className="text-danger">{textError}</p>}
        </div>

        {/* Thêm trường số điện thoại */}
        <div className="form-group mb-3">
          <label htmlFor="phone_number" className="form-label text-color__black">
            Số điện thoại
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone_number"
            placeholder="Nhập số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            pattern="^[0-9]{10,11}$" // Ràng buộc định dạng số điện thoại
          />
          {textError && <p className="text-danger">{textError}</p>}
        </div>
        <PasswordInput
          className={'form-group'}
          classNameLabel={'form-label text-color__black'}
          name="password"
          label="Mật khẩu hiện tại"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={'Nhập mật khẩu'}
          style={{ padding: '8px' }}
        />
        <PasswordInput
          className={'form-group'}
          classNameLabel={'form-label text-color__black'}
          name="confirm_password"
          label="Nhập lại mật khẩu"
          value={confirmPassword}
          placeholder={'Nhập lại mật khẩu'}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ padding: '8px' }}
        />

        <button className="btn btn-primary border-0 w-100 mt-2" style={{ background: '#FA8232' }} type="submit">
          ĐĂNG KÍ
          <img src={ICONS.arrow_right_login} className="ms-2" />
        </button>
      </form>
    </div>
  );
};

export default FormRegister;
