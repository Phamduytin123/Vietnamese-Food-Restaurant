import styles from './FormAuth.scss';
import { ICONS } from '../../constants/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState();

  const [email, setEmail] = useState();

  const [name, setName] = useState();

  const [confirmPassword, setConfirmPassword] = useState();

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
      <button className="tab_button actived">Sign Up</button>
      <form className="form-data p-4">
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label text-color__black">
            Name
          </label>
          <input
            type="email"
            className="form-control"
            id="name"
            placeholder="Enter your name"
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
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {textError && <p className="text-danger">{textError}</p>}
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label text-color__black">
            Password
          </label>
          <div className="position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              placeholder="8+ characters password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <img
              src={ICONS.eye}
              className="position-absolute hide-password"
              alt="Eye Icon"
              onClick={handleHidePassword}
            />
          </div>
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label text-color__black">
            Confirm Password
          </label>
          <div className="position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="confirm_password"
              placeholder="Re-enter your Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <img
              src={ICONS.eye}
              className="position-absolute hide-password"
              alt="Eye Icon"
              onClick={handleHidePassword}
            />
          </div>
        </div>
        <button className="btn btn-primary border-0 w-100 mt-2" style={{ background: '#FA8232' }} type="submit">
          SIGN UP
          <img src={ICONS.arrow_right_login} className="ms-2" />
        </button>
      </form>
    </div>
  );
};

export default FormRegister;
