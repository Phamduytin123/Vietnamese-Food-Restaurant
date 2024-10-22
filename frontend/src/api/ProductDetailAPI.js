import axiosClient from '../utils/axiosCustomize';

const ProductDetailAPI = {
  getProduct: (id) => {
    const url = `/items/${id}`;
    return axiosClient.applicationNoAuth.get(url);
  },
};

export default ProductDetailAPI;
