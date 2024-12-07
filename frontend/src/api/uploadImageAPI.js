import axiosClient from '../utils/axiosCustomize';

const cartAPI = {
  uploadImage: (formData) => {
    const url = '/uploads/image';
    return axiosClient.formData.post(url, formData);
  },
};
export default cartAPI;
