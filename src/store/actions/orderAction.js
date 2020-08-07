import * as actionTypes from './actionTypes';

export const ordersRequestSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        payload:orders
    }
};

export const ordersRequestFailure = (error) => {
    return {
        type:actionTypes.FETCH_ORDERS_FAILURE,
        payload:error
    }
};

export const ordersRequestAPI = () => {
    return {
        type:actionTypes.FETCH_ORDERS_REQUEST,
    }
};

export const purchaseRequestSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_PURCHASE_SUCCESS,
        payload:orders,
    }
};

export const purchaseRequestFailure = (error) => {
    return {
        type:actionTypes.FETCH_PURCHASE_FAILURE,
        payload:error
    }
};

export const purchaseRequestAPI = () => {
    return {
        type:actionTypes.FETCH_PURCHASE_REQUEST,
    }
};

// axios call here
export const fetchOrders = (page) => {
    return {
        type : actionTypes.FETCH_ORDERS_REQUEST_INITIAL,
        page : page
    }
};

export const purchaseOrders = (orderData) => {
    return {
        type : actionTypes.FETCH_PURCHASE_REQUEST_INITIAL,
        orderData : orderData
    }
};




