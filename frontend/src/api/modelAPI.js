import axiosClient from '../utils/axiosCustomize';

const modelAPI = {
  recognize: (formData) => {
    const url = `/recipes/recognize`;
    return axiosClient.formData.post(url, formData);
  },
  recommend: (formData) => {
    const url = `/recipes/recommend`;
    return axiosClient.applicationNoAuth.post(url, formData);
  },
};

export default modelAPI;
