import styles from './FormAuth.scss';
import { ICONS } from '../../constants/icons';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginAPI from '../../api/LoginAPI';

const FormLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState();

  const [email, setEmail] = useState();
  const [textError, setTextError] = useState();

  const fetchLogin = async (formData) => {
    try {
      const res = await LoginAPI.login(formData);
      const accessToken = res.data.acess_token;
      const userInfo = {
        name: res.data.name,
        displayName: res.data.displayName,
        address: res.data.address,
        avatar: res.data.avatar,
      };
      if (accessToken) {
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('user_info', JSON.stringify(userInfo));
        navigate('/');
      } else {
        setTextError('* Login failed, no access token received');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleHidePassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) {
      setTextError('* Please enter a valid email address');
      return;
    }

    const formData = {
      email,
      password,
    };

    fetchLogin(formData);
  };

  return (
    <div className="justify-content-center form">
      <div className="w-100">
        <button className="tab_button actived">Sign In</button>
        <button
          className="tab_button"
          onClick={() => {
            navigate('/auth/register');
          }}
        >
          Sign Up
        </button>
      </div>
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
        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label text-color__black">
            Password
          </label>
          <div className="position-relative">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              placeholder="Enter your password"
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
        <button
          className="btn btn-primary border-0 w-100 mt-2"
          style={{ background: '#FA8232' }}
          type="submit"
          onClick={handleSubmitLogin}
        >
          SIGN IN
          <img src={ICONS.arrow_right_login} className="ms-2" />
        </button>
      </form>
    </div>
  );
};

export default FormLogin;
