import axiosClient from '../utils/axiosCustomize';

const voucherAPI = {
  getVoucher: () => {
    const url = '/vouchers/valid';
    return axiosClient.application.get(url);
  },
};

export default voucherAPI;