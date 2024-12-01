import axiosClient from "../utils/axiosCustomize";

const HotItemsAPI = {
    getHotItems: () => {
        const url = '/hot-item';
        return axiosClient.applicationNoAuth.get(url);
    },
}

export default HotItemsAPI;