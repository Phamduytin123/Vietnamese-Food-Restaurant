import axiosClient from "../utils/axiosCustomize";

const productAPI = {
    getListItems: (page, limit, minPrice, maxPrice, txtSearch, isFood, sortBy, isDiscount, categoryId) => {
        const url = '/items';
        const params = {
            page,
            limit,
            minPrice,
            maxPrice,
            txtSearch,
            isFood,
            sortBy,
            isDiscount,
            categoryId
        };
        return axiosClient.application.get(url, { params });
    },
}

export default productAPI;