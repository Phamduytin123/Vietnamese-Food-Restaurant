import axios from 'axios';
import queryString from 'query-string';

const accessToken = localStorage.getItem('access_token');

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

  formDataAuth: axios.create({
    baseURL: process.env.REACT_APP_API_URL,

    headers: {
      'content-type': 'multipart/form-data',
      'Accept-Language': 'vi',
      Authorization: `Bearer ${accessToken}`,
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
