import React, { useRef, useState, useEffect } from 'react';
import './index.scss';
import LoadingOverlay from '../../../components/loading_overlay';
import ImageUploader from '../../../components/image-upload';
import { IMAGES } from '../../../constants/images';
import { FaArrowLeft } from 'react-icons/fa';
import { FaUpload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import ProductDetailAPI from '../../../api/ProductDetailAPI';
import categoryAPI from '../../../api/categoryAPI';
import UploadImageAPI from '../../../api/uploadImageAPI';
import { toast } from 'react-toastify';

export const AdminItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(product?.category?.name || '');
  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState({
    image1: null,
    image2: null,
    image3: null,
    image4: null,
  });
  const [productForm, setProductForm] = useState({
    id: '',
    name_vi: '',
    discount: 0,
    calories: 0,
    fat: 0,
    carbohydrates: 0,
    protein: 0,
    cholesterol: 0,
    sodium: 0,
    fiber: 0,
    categoryId: null,
    description_vi: '',
    availability: 'in stock',
    ingredients_vi: '',
    images: [],
    regional_vi: '',
    itemSizes: [
      {
        id: '',
        size_vi: '',
        price: 0,
      },
    ],
  });

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await ProductDetailAPI.getProduct(id);
      const item = response.data;
      setProduct(item);
      setProductForm({
        id: item.id,
        name_vi: item.name || '',
        discount: parseFloat(item.discount || 0),
        calories: parseFloat(item.calories || 0),
        fat: parseFloat(item.fat || 0),
        carbohydrates: parseFloat(item.carbohydrates || 0),
        protein: parseFloat(item.protein || 0),
        cholesterol: parseFloat(item.cholesterol || 0),
        sodium: parseFloat(item.sodium || 0),
        fiber: parseFloat(item.fiber || 0),
        categoryId: item.categoryId || null,
        description_vi: item.description || '',
        availability: item.availability.toLowerCase(),
        ingredients_vi: Array.isArray(item.ingredients) ? item.ingredients.join(', ') : '',
        images: item.images || [],
        regional_vi: item.regional || '',
        itemSizes: item.itemSizes.map((size) => ({
          id: size.id || '',
          size_vi: size.size || '',
          price: size.price || 0,
        })),
      });
      setImageFiles({
        image1: item.images?.[1] || null,
        image2: item.images?.[2] || null,
        image3: item.images?.[3] || null,
        image4: item.images?.[4] || null,
      });
      setSelectedCategory(item?.category?.name);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const uploadImage = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('image', file);
      const response = await UploadImageAPI.uploadImage(formData);
      console.log('Uploaded image:', response);
      return response.data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categories = await categoryAPI.getAllListCategories();
      setCategories(categories.data.categories.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (field, value) => {
    setProductForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleSizeChange = (index, field, value) => {
    const updatedSizes = [...productForm.itemSizes];
    updatedSizes[index][field] = value;
    setProductForm((prev) => ({
      ...prev,
      itemSizes: updatedSizes,
    }));
  };

  const parseFormattedPrice = (formattedPrice) => {
    return parseInt(String(formattedPrice).replace(/\./g, '').replace(/ VND/g, ''), 10) || 0;
  };

  const handleStatusChange = (status) => {
    setProductForm((prev) => ({
      ...prev,
      availability: status,
    }));
  };
  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);
  const handleImageChange = async (index, field, file) => {
    if (!file) return;

    // Cập nhật preview ảnh ngay lập tức
    const reader = new FileReader();
    reader.onloadend = () => {
      const dataUrl = reader.result; // Kết quả là Data URL
      setImageFiles((prev) => ({
        ...prev,
        [field]: dataUrl, // Lưu Data URL vào state `imageFiles`
      }));
    };
    reader.readAsDataURL(file);

    try {
      // Upload ảnh
      const uploadedImageUrl = await uploadImage(file);

      // Cập nhật `productForm` với URL đã upload
      setProductForm((prev) => {
        const updatedImages = [...prev.images];
        updatedImages[index] = uploadedImageUrl;
        console.log('Updated images:', updatedImages);
        return { ...prev, images: updatedImages };
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const handleImageMainChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Hiển thị preview ảnh chính ngay lập tức
    const reader = new FileReader();
    reader.onloadend = () => {
      document.querySelector('.profile-picture').src = reader.result; // Hiển thị ảnh preview
    };
    reader.readAsDataURL(file);

    try {
      // Upload ảnh
      const uploadedImageUrl = await uploadImage(file);

      // Cập nhật `productForm` với URL ảnh đã upload
      setProductForm((prev) => {
        const updatedImages = [...prev.images];
        updatedImages[0] = uploadedImageUrl; // Gán URL ảnh chính
        console.log('Updated images:', updatedImages);
        return { ...prev, images: updatedImages };
      });
    } catch (error) {
      console.error('Error uploading main image:', error);
    }
  };

  const handleAddSize = () => {
    const newSize = {
      id: null, // Hoặc một giá trị mặc định nếu cần
      size_vi: '',
      size_en: '',
      price: 0,
    };

    setProductForm((prev) => ({
      ...prev,
      itemSizes: [...prev.itemSizes, newSize], // Thêm size mới vào danh sách
    }));
  };

  const handleDeleteSize = (index) => {
    if (productForm.itemSizes.length > 1) {
      const updatedSizes = productForm.itemSizes.filter((_, i) => i !== index); // Loại bỏ size tại vị trí `index`
      setProductForm((prev) => ({
        ...prev,
        itemSizes: updatedSizes,
      }));
    } else {
      toast.warning('Không thể xoá, cần ít nhất một size!!');
    }
  };

  const handleCategoryChange = (event) => {
    const selectedCategoryName = event.target.value;
    const selectedCategory = categories.find((cat) => cat.name === selectedCategoryName);
    setSelectedCategory(selectedCategoryName);
    setProductForm((prev) => ({
      ...prev,
      categoryId: selectedCategory?.id || null,
    }));
  };
  const handleResponseData = (responseData) => {
    setProductForm({
      id: responseData.id || '',
      name_vi: responseData.name_vi || '',
      discount: parseFloat(responseData.discount) || 0,
      calories: parseFloat(responseData.calories) || 0,
      fat: parseFloat(responseData.fat) || 0,
      carbohydrates: parseFloat(responseData.carbohydrates) || 0,
      protein: parseFloat(responseData.protein) || 0,
      cholesterol: parseFloat(responseData.cholesterol) || 0,
      sodium: parseFloat(responseData.sodium) || 0,
      fiber: parseFloat(responseData.fiber) || 0,
      categoryId: responseData.categoryId || null,
      description_vi: responseData.description_vi || '',
      availability: responseData.availability || 'in stock',
      ingredients_vi: JSON.parse(responseData.ingredients_vi || '[]'),
      images: JSON.parse(responseData.images || '[]'),
      regional_vi: responseData.regional_vi || '',
      itemSizes: responseData.itemSizes?.map((size) => ({
        id: size.id || '',
        size_vi: size.size_vi || '',
        price: size.price || 0,
      })) || [
        {
          id: '',
          size_vi: '',
          price: 0,
        },
      ],
    });
  };
  const validateAndParse = (field, fieldName) => {
    if (field == null || field === '') {
      toast.warning(`${fieldName} không được để trống.`);
      return false;
    } else if (isNaN(parseFloat(field)) || parseFloat(field) <= 0) {
      toast.warning(`${fieldName} phải là số và lớn hơn 0.`);
      return false;
    }
    return true; // Thêm dòng này để trả về true khi mọi thứ hợp lệ
  };

  const validateForm = () => {
    if (!productForm.images || productForm.images.length !== 5) {
      toast.warning('Danh sách hình ảnh phải có đúng 5 hình ảnh.');
      return false;
    }

    if (!productForm.name_vi.trim()) {
      toast.warning('Tên sản phẩm không được để trống.');
      return false;
    }

    if (!productForm.description_vi.trim()) {
      toast.warning('Mô tả sản phẩm không được để trống.');
      return false;
    }

    if (!selectedCategory) {
      toast.warning('Vui lòng chọn danh mục.');
      return false;
    }

    if (!productForm.regional_vi.trim()) {
      toast.warning('Vui lòng chọn khu vực.');
      return false;
    }

    if (!productForm.ingredients_vi.trim()) {
      toast.warning('Vui lòng nhập thành phần.');
      return false;
    }

    if (productForm.discount < 0 || productForm.discount > 100) {
      toast.warning('Giảm giá phải nằm trong khoảng từ 0% đến 100%.');
      return false;
    }

    if (productForm.itemSizes.some((size) => !size.size_vi.trim())) {
      toast.warning('Tất cả các size phải có tên.');
      return false;
    }
    if (productForm.itemSizes.some((size) => size.price <= 0)) {
      toast.warning('Giá của các size phải lớn hơn 0.');
      return false;
    }

    // Kiểm tra các trường khác (nếu bất kỳ trường nào không hợp lệ, trả về false)
    const fields = [
      { field: productForm.calories, name: 'Calories' },
      { field: productForm.fat, name: 'Fat' },
      { field: productForm.carbohydrates, name: 'Carbohydrates' },
      { field: productForm.protein, name: 'Protein' },
      { field: productForm.cholesterol, name: 'Cholesterol' },
      { field: productForm.sodium, name: 'Sodium' },
      { field: productForm.fiber, name: 'Fiber' },
    ];

    for (const { field, name } of fields) {
      if (!validateAndParse(field, name)) {
        return false; // Dừng kiểm tra nếu bất kỳ trường nào không hợp lệ
      }
    }

    return true; // Tất cả đều hợp lệ
  };

  const handleSave = async () => {
    try {
      if (!validateForm()) return;
      setLoading(true);
      const updatedItemSizes = productForm.itemSizes.map((size) => ({
        ...size,
        price: parseFormattedPrice(size.price),
      }));
      const payload = {
        ...productForm,
        images: JSON.stringify(productForm.images).replace(/"/g, "'"), // Mảng file để gửi API
        ingredients_vi: JSON.stringify(productForm.ingredients_vi.split(',').map((item) => item.trim())),
        itemSizes: JSON.stringify(updatedItemSizes),
      };
      console.log('Payload:', payload.images);
      const formData = new FormData();

      Object.keys(payload).forEach((key) => {
        const value = payload[key];

        if (value instanceof File) {
          formData.append(key, value);
        } else {
          // Các trường hợp còn lại (string, number, etc.)
          formData.append(key, value);
        }
      });

      // Debug dữ liệu trong formData
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      const response = await ProductDetailAPI.updateProduct(formData);
      if (response?.status === 200) {
        toast.success('Cập nhật thành công!');
        handleResponseData(response.data);
      } else {
        toast.error('Cập nhật thất bại!');
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleCreate = async () => {
    try {
      if (!validateForm()) return;
      setLoading(true);

      // Loại bỏ trường `id` từ productForm
      const { id, ...formWithoutId } = productForm;

      // Chuyển đổi itemSizes và chuẩn bị payload
      const updatedItemSizes = formWithoutId.itemSizes.map((size) => ({
        ...size,
        price: parseFormattedPrice(size.price),
      }));
      const payload = {
        ...formWithoutId,
        images: JSON.stringify(formWithoutId.images).replace(/"/g, "'"), // Mảng file để gửi API
        ingredients_vi: JSON.stringify(formWithoutId.ingredients_vi.split(',').map((item) => item.trim())),
        itemSizes: JSON.stringify(updatedItemSizes),
      };

      console.log('Payload:', payload.images);
      const formData = new FormData();

      Object.keys(payload).forEach((key) => {
        const value = payload[key];
        if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });

      // Debug dữ liệu trong formData
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }

      // Gọi API tạo mới sản phẩm
      const response = await ProductDetailAPI.createProduct(formData);
      if (response?.status === 201) {
        toast.success('Tạo sản phẩm thành công!');
        navigate('/admin/products');
      } else {
        toast.error('Tạo sản phẩm thất bại!');
      }
    } catch (error) {
      console.error('Lỗi khi tạo sản phẩm:', error);
      toast.error('Có lỗi xảy ra!');
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/admin/products');
  };
  return (
    <div className="item-profile">
      <div className="main-content">
        <LoadingOverlay loading={loading} />
        <div className="header">
          <FaArrowLeft className="icon-left-back" onClick={handleBack} />
          <h1>Sản phẩm</h1>
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
                    required
                  />
                  <img
                    className="profile-picture"
                    alt="Item Logo"
                    src={productForm?.images?.[0] || IMAGES.img_item_details}
                  />
                  <div className="upload-icon">
                    <FaUpload size={30} color="#FA8232" />
                  </div>
                </label>
              </div>

              <div className="item-details-infor">
                <div className="item-name">
                  <label htmlFor="">Tên sản phẩm</label>
                  <input
                    type="text"
                    value={productForm?.name_vi || ''}
                    onChange={(e) => handleInputChange('name_vi', e.target.value)}
                    required
                  />
                </div>
                <div className="txt-description">
                  <label htmlFor="">Mô tả</label>
                  <textarea
                    name=""
                    id=""
                    value={productForm?.description_vi || ''}
                    onChange={(e) => handleInputChange('description_vi', e.target.value)}
                    required
                  ></textarea>
                </div>

                <div className="item-details-others">
                  <div className="item-category">
                    <label htmlFor="category-select">Loại sản phẩm</label>
                    <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                      <option value="" disabled>
                        {loading ? 'Loading...' : '-- Select a Category --'}
                      </option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="item-regional">
                    <label htmlFor="">Khu vực</label>
                    <input
                      type="text"
                      value={productForm?.regional_vi || ''}
                      onChange={(e) => handleInputChange('regional_vi', e.target.value)}
                      required
                    />
                  </div>

                  <div className="item-regional">
                    <label htmlFor="">Giảm giá</label>
                    <input
                      type="text"
                      value={`${productForm?.discount || 0}%`} // Hiển thị giá trị có dấu %
                      onChange={(e) => {
                        // Loại bỏ dấu % khi lưu
                        const value = e.target.value.replace('%', '');
                        handleInputChange('discount', parseFloat(value) || 0);
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="list-image-upload">
                  <label htmlFor="">Ảnh phụ</label>

                  <div className="list-image">
                    <div className="list-image">
                      {[1, 2, 3, 4].map((num) => (
                        <ImageUploader
                          key={`image-${num}`}
                          imageSrc={imageFiles[`image${num}`]} // Lấy ảnh từ `imageFiles`
                          onImageChange={(file) => handleImageChange(num, `image${num}`, file)} // Gọi hàm với `index` và `field`
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="delete-items">
                <button className="btn-delete">Xoá sản phẩm</button>
                <select
                  value={productForm.availability.trim()}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className={'select-type select-' + productForm.availability.replace(/\s+/g, '_')}
                >
                  <option value="in stock">Còn hàng</option>
                  <option value="out of stock">Hết hàng</option>
                  <option value="comming soon">Sắp ra mắt</option>
                  <option value="not today">Không phải hôm nay</option>
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
                <input
                  id="item-carbo"
                  type="number"
                  value={productForm?.carbohydrates || ''}
                  onChange={(e) => handleInputChange('carbohydrates', e.target.value)}
                  required
                />
              </div>

              <div className="item-protein">
                <label htmlFor="item-protein">Protein</label>
                <input
                  id="item-protein"
                  type="number"
                  value={productForm?.protein || ''}
                  onChange={(e) => handleInputChange('protein', e.target.value)}
                  required
                />
              </div>

              <div className="item-sodium">
                <label htmlFor="item-sodium">Sodium</label>
                <input
                  id="item-sodium"
                  type="number"
                  value={productForm?.sodium || ''}
                  onChange={(e) => handleInputChange('sodium', e.target.value)}
                  required
                />
              </div>

              <div className="item-calory">
                <label htmlFor="item-calory">Calories</label>
                <input
                  id="item-calory"
                  type="number"
                  value={productForm?.calories || ''}
                  onChange={(e) => handleInputChange('calories', e.target.value)}
                  required
                />
              </div>

              <div className="item-fat">
                <label htmlFor="item-fat">Fat</label>
                <input
                  id="item-fat"
                  type="number"
                  value={productForm?.fat || ''}
                  onChange={(e) => handleInputChange('fat', e.target.value)}
                  required
                />
              </div>

              <div className="item-fiber">
                <label htmlFor="item-fiber">Fiber</label>
                <input
                  id="item-fiber"
                  type="number"
                  value={productForm?.fiber || ''}
                  onChange={(e) => handleInputChange('fiber', e.target.value)}
                  required
                />
              </div>

              <div className="item-cholesterol">
                <label htmlFor="item-cholesterol">Cholesterol</label>
                <input
                  id="item-cholesterol"
                  type="number"
                  value={productForm?.cholesterol || ''}
                  onChange={(e) => handleInputChange('cholesterol', e.target.value)}
                  required
                />
              </div>

              <div className="item-ingredients">
                <label htmlFor="item-ingredients">Thành phẩn</label>
                <input
                  id="item-ingredients"
                  type="text"
                  value={productForm?.ingredients_vi}
                  onChange={(e) => handleInputChange('ingredients_vi', e.target.value)}
                  required
                />
              </div>
            </div>
          </div>
        </div>
        <div className="size-table">
          <h2>Size</h2>
          <table>
            <thead>
              <tr>
                <th>Thể loại</th>
                <th>Giá</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {productForm.itemSizes.map((size, index) => (
                <tr key={index}>
                  <td>
                    <input
                      type="text"
                      value={size.size_vi}
                      onChange={(e) => handleSizeChange(index, 'size_vi', e.target.value)}
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={parseFormattedPrice(size.price)}
                      onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                      required
                    />
                  </td>
                  <td>
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
            onClick={() => {
              if (!productForm.id) {
                handleCreate();
              } else {
                handleSave();
              }
            }}
          >
            Lưu thay đổi
          </button>
        </div>
      </div>
    </div>
  );
};
