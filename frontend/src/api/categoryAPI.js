import axiosClient from "../utils/axiosCustomize";

const CategorieAPI = {
    getListCategories: (isFood) => {
        const url = '/categories';
        const params = {
            isFood
        };
        return axiosClient.applicationNoAuth.get(url, { params });
    },
}

export default CategorieAPI;