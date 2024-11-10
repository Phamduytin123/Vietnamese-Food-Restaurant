import { set } from 'lodash';
import axiosClient from '../utils/axiosCustomize';

const wishlistAPI = {
  getWishlist: () => {
    const url = '/likes';
    return axiosClient.application.get(url);
  },
  setWish: (data) => {
    const url = '/likes';
    return axiosClient.application.post(url, {itemId: data});
  },
};

export default wishlistAPI;
