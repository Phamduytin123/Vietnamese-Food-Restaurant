import axiosClient from '../utils/axiosCustomize';

const revenueAPI = {
  getRevenue: (page = 1, limit = 4) => {
    const url = `/revenue?page=${page}&limit=${limit}`;
    return axiosClient.application.get(url);
  },
};
export default revenueAPI;
