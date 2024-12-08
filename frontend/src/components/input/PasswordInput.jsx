import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
const PasswordInput = ({ name, label, value, onChange, disabled, style }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="d-flex flex-column mb-3">
      <label htmlFor={name}>{label}</label>
      <div className="position-relative">
        <input
          type={showPassword ? 'text' : 'password'}
          name={name}
          id={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
          style={style}
          className="form-control"
        />
        <span
          className="position-absolute top-50 end-0 translate-middle-y pe-3 cursor-pointer"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </span>
      </div>
    </div>
  );
};

export default PasswordInput;
