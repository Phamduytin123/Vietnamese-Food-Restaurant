import { BsZoomIn } from 'react-icons/bs';

const modalStyles = {
  content: {
    position: 'absolute',
    width: '35%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    padding: '24px 30px',
    zIndex: '998',
  },
};

export const modalInfoStyle = {
  content: {
    position: 'absolute',
    width: '30%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    padding: '24px 30px',
    zIndex: '999',
  },
};

export const modalRecommendStyle = {
  content: {
    position: 'absolute',
    width: '50%',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '12px',
    backgroundColor: '#FFFFFF',
    padding: '24px 30px',
    zIndex: '999',
    overflow: 'hidden',
  },
};
export default modalStyles;
