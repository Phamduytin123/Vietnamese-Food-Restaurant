import axiosClient from '../utils/axiosCustomize';

const ProductDetailAPI = {
  getProduct: (id) => {
    const url = `/items/${id}?Accept-Language=vi`;
    return axiosClient.applicationNoAuth.get(url);
  },
  updateProduct: (formData) => {
    const url = `admin/items`;
    return axiosClient.formData.put(url, formData);
  },
  createProduct: (formData) => {
    const url = `admin/items`;
    return axiosClient.formData.post(url, formData);
  },
};

export default ProductDetailAPI;
