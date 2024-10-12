import styles from './Button.scss';

const ButtonPrimary = ({ children, className, isActive, onClick, isDisable, style }) => {
  return (
    <button
      className={`btn-primary ${className} ${isActive ? 'actived' : ''} ${isDisable ? 'disabled' : ''}`}
      onClick={onClick}
      style={style}
      disabled={isDisable}
    >
      {children}
    </button>
  );
};

export default ButtonPrimary;
