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

  reviewProduct: (formData) => {
    const url = `/reviews`;
    return axiosClient.application.post(url, formData);
  },

  cancelOrder: (formData) => {
    const url = `/orders/cancel`;
    return axiosClient.application.post(url, formData);
  },

  adminListOrders: (status, date, page, limit) => {
    const url = `/admin/orders`;

    const params = {};
    if (status) params.status = status;
    if (date) params.date = date;
    if (page) params.page = page;
    if (limit) params.limit = limit;

    return axiosClient.application.get(url, { params });
  },
  adminUpdateStatusOrder: (orderId, status) => {
    const url = `/orders/updateStatus`;
    return axiosClient.application.post(url, { id: orderId, status: status });
  },
};
export default orderAPI;
