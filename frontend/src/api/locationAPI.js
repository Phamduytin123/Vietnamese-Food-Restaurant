import axiosClient from '../utils/axiosCustomize';

const locationAPI = {
  getProvinces: () => {
    const url = 'https://esgoo.net/api-tinhthanh/1/0.htm';
    return axiosClient.applicationNoAuth.get(url);
  },
  getDistricts: (provinceId) => {
    const url = `https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`;
    return axiosClient.applicationNoAuth.get(url);
  },
};

export default locationAPI;
