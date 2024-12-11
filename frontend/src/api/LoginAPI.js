import axiosClient from '../utils/axiosCustomize';

const LoginAPI = {
  login: (formData) => {
    const url = `/auth/login`;
    return axiosClient.applicationNoAuth.post(url, formData);
  },
  resetPassword: (formData) => {
    const url = `/auth/reset-password`;
    return axiosClient.applicationNoAuth.post(url, formData);
  },
  register: (formData) => {
    const url = `/auth/register`;
    return axiosClient.applicationNoAuth.post(url, formData);
  },
};

export default LoginAPI;
