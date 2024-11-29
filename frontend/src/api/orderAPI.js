import axiosClient from '../utils/axiosCustomize';

const orderAPI = {
  listOrders: (formData) => {
    const url = `/orders/`;
    return axiosClient.application.get(url, formData);
  },
  orderDetail: (id) => {
    const url = `/orders/${id}`;
    return axiosClient.application.get(url, id);
  },
};

export default orderAPI;
