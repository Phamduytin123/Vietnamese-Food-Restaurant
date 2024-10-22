import { get, update } from "lodash";
import axiosClient from "../utils/axiosCustomize";

const cartAPI = {
    getCart: () => {
        const url = '/carts';
        return axiosClient.application.get(url);
    },
    deleteCart: (id) => {
        const url = `/carts/${id}`;
        return axiosClient.application.delete(url);
    },
    updateCart: (id, data) => {
        const url = `/carts/${id}`;
        return axiosClient.application.put(url, data);
    },
}

export default cartAPI;