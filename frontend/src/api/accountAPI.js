import axiosClient from '../utils/axiosCustomize';

const accountAPI = {
  adminListAccount: (page, limit, role ) => {
    const url = '/admin/accounts';
    const params = {
      page : page,
      limit : limit,
      role : role
    }
    return axiosClient.application.get(url, {params});
  },
};
export default accountAPI;
