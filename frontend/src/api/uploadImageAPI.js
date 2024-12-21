import axiosClient from '../utils/axiosCustomize';

const UploadImageAPI = {
  uploadImage: (formData) => {
    const url = '/uploads/image';
    return axiosClient.formDataNoAuth.post(url, formData);
  },
};
export default UploadImageAPI;
