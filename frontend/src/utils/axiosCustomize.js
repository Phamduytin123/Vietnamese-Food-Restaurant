import axios from 'axios';
import queryString from 'query-string';

const axiosClient = {
  application: axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    headers: {
      'content-type': 'application/json',
      'Accept-Language': 'vi',
    },
    paramsSerializer: (params) => queryString.stringify(params),
  }),

  applicationNoAuth: axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    headers: {
      'content-type': 'application/json',
      'Accept-Language': 'vi',
    },
    paramsSerializer: (params) => queryString.stringify(params),
  }),

  formData: axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    headers: {
      'content-type': 'multipart/form-data',
      'Accept-Language': 'vi',
    },
  }),

  formDataNoAuth: axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    headers: {
      'content-type': 'multipart/form-data',
      'Accept-Language': 'vi',
    },
  }),
};

export default axiosClient;
