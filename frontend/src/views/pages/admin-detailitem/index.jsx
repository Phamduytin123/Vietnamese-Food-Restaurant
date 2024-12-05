import React, { useRef, useState, useEffect } from 'react';
import './index.scss';
import LoadingOverlay from '../../../components/loading_overlay';
import ImageUploader from '../../../components/image-upload';
import { IMAGES } from '../../../constants/images';
import { FaArrowLeft } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';

export const AdminItemDetail = () => {
  const storedUserInfo = localStorage.getItem('user_info');
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const itemId = storedUserInfo ? JSON.parse(storedUserInfo)?.item_id : '';
  const [item, setitem] = useState(null);
  const [quillValue, setQuillValue] = useState('');
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [originalitem, setOriginalitem] = useState(null);
  const [imageFiles, setImageFiles] = useState({
    image2: null,
    image3: null,
    image4: null,
    image5: null,
  });

  const handleImageMainChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log(reader.result);
        // Replace the current image
        document.querySelector('.profile-picture').src = reader.result;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageChange = (field, value) => {
    setImageFiles((prev) => ({
      ...prev,
      [field]: value,
    }));
    const reader = new FileReader();
    reader.onloadend = () => {
      setitem((prev) => ({
        ...prev,
        [field]: reader.result,
      }));
    };
    reader.readAsDataURL(value);
  };

  const [sizes, setSizes] = useState([
    { type: 'Small meal', price: '20,000đ' },
    { type: 'Medium meal', price: '20,000đ' },
    { type: 'Big meal', price: '20,000đ' },
  ]);

  const handleAddSize = () => {
    setSizes([
      ...sizes,
      { type: '', price: '' }, // Default values
    ]);
  };

  const handleDeleteSize = (index) => {
    if (sizes.length > 1) {
      const updatedSizes = sizes.filter((_, i) => i !== index);
      setSizes(updatedSizes);
    } else {
      alert('Không thể xóa. Cần giữ ít nhất 1 size!');
    }
  };

  const handleChange = (index, field, value) => {
    const updatedSizes = [...sizes];
    updatedSizes[index][field] = value;
    setSizes(updatedSizes);
  };

  const [status, setStatus] = useState('in_stock');

  const handleChangeStatus = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div className="item-profile">
      <div className="main-content">
        <div className="header">
          <FaArrowLeft className="icon-left-back" />
          <h1>Products</h1>
        </div>
        <div className="profile-section">
          <div className="profile-picture-section">
            <div className="profile-picture-title">
              <div className="image-upload-container">
                <label htmlFor="image-upload" className="upload-wrapper">
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageMainChange}
                    className="image-input"
                  />
                  <img className="profile-picture" alt="Item Logo" src={IMAGES.img_item_details} />
                  <div className="upload-icon">
                    <FaUpload size={30} color="#FA8232" />
                  </div>
                </label>
              </div>

              <div className="item-details-infor">
                <div className="txt-description">
                  <label htmlFor="">Description</label>
                  <textarea name="" id="">
                    Ngon quá
                  </textarea>
                </div>

                <div className="item-details-others">
                  <div className="item-category">
                    <label htmlFor="">Category</label>
                    <select name="" id=""></select>
                  </div>

                  <div className="item-regional">
                    <label htmlFor="">Regional</label>
                    <input type="text" />
                  </div>

                  <div className="item-regional">
                    <label htmlFor="">Discount</label>
                    <input type="text" />
                  </div>
                </div>

                <div className="list-image-upload">
                  <label htmlFor="">Upload Image</label>

                  <div className="list-image">
                    <ImageUploader
                      // imageSrc={item.image2}
                      onImageChange={(value) => handleImageChange('image2', value)}
                    />
                    <ImageUploader
                      // imageSrc={item.image3}
                      onImageChange={(value) => handleImageChange('image3', value)}
                    />
                    <ImageUploader
                      // imageSrc={item.image4}
                      onImageChange={(value) => handleImageChange('image4', value)}
                    />
                    <ImageUploader
                      // imageSrc={item.image5}
                      onImageChange={(value) => handleImageChange('image5', value)}
                    />
                  </div>
                </div>
              </div>

              <div className="delete-items">
                <button className="btn-delete">DELETE</button>
                <select
                  value={status}
                  onChange={handleChangeStatus}
                  className={`select-type select-${status}`} // Áp dụng lớp CSS theo giá trị
                >
                  <option value="in_stock">Instock</option>
                  <option value="out_stock">Out of stock</option>
                  <option value="coming_soon">Coming soon</option>
                  <option value="not_today">Not today</option>
                </select>
              </div>
            </div>
          </div>

          <div className="item-details">
            <div className="item-details-label">
              <h2>Thành phần dinh dưỡng</h2>
            </div>
            <div className="item-info">
              <div className="item-carbo">
                <label htmlFor="item-carbo">Carbohydrates</label>
                <input id="item-carbo" type="text" />
              </div>

              <div className="item-protein">
                <label htmlFor="item-protein">Protein</label>
                <input id="item-protein" type="item-protein" />
              </div>

              <div className="item-sodium">
                <label htmlFor="item-sodium">Sodium</label>
                <input id="item-sodium" type="text" />
              </div>

              <div className="item-calory">
                <label htmlFor="item-calory">Calories</label>
                <input id="item-calory" type="text" />
              </div>

              <div className="item-fat">
                <label htmlFor="item-fat">Fat</label>
                <input id="item-fat" type="text" />
              </div>

              <div className="item-fiber">
                <label htmlFor="item-fiber">Fiber</label>
                <input id="item-fiber" type="text" />
              </div>

              <div className="item-ingredients">
                <label htmlFor="item-ingredients">Ingredients</label>
                <input id="item-ingredients" type="text" />
              </div>
            </div>
          </div>
        </div>
        <div className="size-table">
          <h2>Size</h2>
          <table>
            <thead>
              <tr>
                <th>Type</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {sizes.map((size, index) => (
                <tr key={index}>
                  <td className="type">
                    <input
                      type="text"
                      value={size.type}
                      onChange={(e) => handleChange(index, 'type', e.target.value)}
                      placeholder="Type"
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={size.price}
                      onChange={(e) => handleChange(index, 'price', e.target.value)}
                      placeholder="Price"
                    />
                  </td>
                  <td className="delete">
                    <button className="delete-size" onClick={() => handleDeleteSize(index)}>
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="add-size" onClick={handleAddSize}>
            + Thêm size
          </button>
        </div>

        <div className="save-button-section">
          <button
            className="save-button"
            // onClick={handleSave}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};
