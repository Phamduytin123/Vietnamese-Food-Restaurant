import axiosClient from "../utils/axiosCustomize";

const paymentAPI = {
    payZalopay: (data) => {
        const url = '/zalo-payment/payment';
        return axiosClient.application.post(url, data);
    },
    payMomo: (data) => {
        const url = `/momo-payment/payment`;
        return axiosClient.application.post(url, data);
    },
    checkSuccessZalo: (data) => {
        const url = `/zalo-payment/order-status/${data}`;
        return axiosClient.application.get(url);
    },
    checkSuccessMomo: (data) => {
        const url = `/momo-payment/check-status-transaction`;
        return axiosClient.application.post(url, {orderId: data});
    }
}

export default paymentAPI;