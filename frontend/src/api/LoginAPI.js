import axiosClient from '../utils/axiosCustomize';

const LoginAPI = {
  login: (formData) => {
    const url = `/auth/login`;
    return axiosClient.applicationNoAuth.post(url, formData);
  },
};

export default LoginAPI;
