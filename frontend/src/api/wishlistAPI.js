import axiosClient from '../utils/axiosCustomize';

const wishlistAPI = {
  getWishlist: () => {
    const url = '/likes';
    return axiosClient.application.get(url);
  },
};

export default wishlistAPI;
