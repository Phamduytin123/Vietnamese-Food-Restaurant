import axiosClient from '../utils/axiosCustomize';

const orderAPI = {
  listOrders: (formData) => {
    const url = `/orders/`;
    return axiosClient.application.get(url, formData);
  },
};

export default orderAPI;
