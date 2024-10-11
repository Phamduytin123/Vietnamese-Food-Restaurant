import styles from './Button.scss';

const ButtonPrimary = ({ children, className, isActive, onClick, style }) => {
  return (
    <button className={`btn-primary ${className} ${isActive ? 'actived' : ''}`} onClick={onClick} style={style}>
      {children}
    </button>
  );
};

export default ButtonPrimary;
