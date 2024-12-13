import axiosClient from "../utils/axiosCustomize";

const CategoryAPI = {
    getListCategories: (isFood) => {
        const url = '/categories';
        let params = {}
        if(isFood !== null){
            params = {
                isFood : isFood
            }
        }
        return axiosClient.applicationNoAuth.get(url, { params });
    },
    getAllListCategories: () => {
        const url = '/categories';
        return axiosClient.applicationNoAuth.get(url);
    },
}

export default CategoryAPI;