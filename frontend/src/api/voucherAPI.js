import axiosClient from '../utils/axiosCustomize';

const voucherAPI = {
  getVoucher: () => {
    const url = '/vouchers/valid';
    return axiosClient.application.get(url);
  },
  getVoucherByAdmin: () => {
    const url = '/admin/vouchers';
    return axiosClient.application.get(url);
  },
  updateVoucher: (voucherData) => {
    const url = '/admin/vouchers';
    return axiosClient.application.put(url, voucherData);
  },
  createVoucher: (voucherData) => {
    const url = '/admin/vouchers';
    return axiosClient.application.post(url, voucherData);
  },
};

export default voucherAPI;