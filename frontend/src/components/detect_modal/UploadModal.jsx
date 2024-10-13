import './DetectModal.scss';
import { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import { IMAGES } from '../../constants/images';
import ButtonPrimary from '../button/ButtonPrimary';
import ClipLoader from 'react-spinners/ClipLoader'; // Import spinner
import modalStyles from './constant';
import { ICONS } from '../../constants/icons';

const UploadModal = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  const [imageURL, setImageURL] = useState(IMAGES.upload_image);

  const [loading, setLoading] = useState(false); // Thêm trạng thái loading

  const fileUploadRef = useRef();

  const handleImageUpload = (event) => {
    event.preventDefault();

    fileUploadRef.current.click();
  };

  const uploadImageDisplay = (fileImage) => {
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'];
    if (fileImage && validTypes.includes(fileImage.type)) {
      setLoading(true);

      setTimeout(() => {
        const cachedURL = URL.createObjectURL(fileImage);
        setImageURL(cachedURL);
        setLoading(false);
      }, 1000);
    } else {
      alert('Please upload a valid image file (PNG, JPG, JPEG, WEBP).');
    }
  };

  const handleRemoveImage = () => {
    setImageURL(IMAGES.upload_image);
    fileUploadRef.current.value = null;
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const fileImage = event.dataTransfer.files[0];
    uploadImageDisplay(fileImage);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
  };

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <button className="option-button" onClick={openModal}>
        <img src={ICONS.camera} alt="Camera" />
        <span>Tìm kiếm bằng hình ảnh</span>
      </button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
        contentLabel="Example Modal"
        overlayClassName="overlay"
      >
        <div>
          <p className="modal-title">Upload Image</p>
          <form
            id="form"
            className="position-relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            encType="multipart/form-data"
          >
            {imageURL !== IMAGES.upload_image && (
              <button type="button" className="remove-image-btn position-absolute" onClick={handleRemoveImage}>
                X
              </button>
            )}

            <button
              type="submit"
              onClick={handleImageUpload}
              className="form-upload-submit d-flex justify-content-center align-items-center flex-column"
            >
              {loading && (
                <div className="overlay">
                  <div className="d-flex justify-content-center position-absolute loading">
                    <ClipLoader size={50} color={'#000000'} loading={loading} />
                  </div>
                </div>
              )}
              <img className="form-upload-image" src={imageURL} alt="Upload Image" />
              {imageURL === IMAGES.upload_image && (
                <div>
                  <p>Drop your image here, or browse</p>
                  <p>Supports: PNG, JPG, JPEG, WEBP</p>
                </div>
              )}
            </button>
            <input
              type="file"
              ref={fileUploadRef}
              onChange={(e) => uploadImageDisplay(e.target.files[0])}
              id="file"
              hidden
            />
          </form>

          <div className="mt-4 d-flex justify-content-end">
            <ButtonPrimary onClick={closeModal}>Cancel</ButtonPrimary>
            <ButtonPrimary
              style={{ marginRight: '0' }}
              isDisable={imageURL === IMAGES.upload_image}
              isActive={true}
              onClick={closeModal}
            >
              Done
            </ButtonPrimary>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UploadModal;
