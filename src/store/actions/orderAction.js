import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const ordersRequestSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        payload:orders
    }
};

const ordersRequestFailure = (error) => {
    return {
        type:actionTypes.FETCH_ORDERS_FAILURE,
        payload:error
    }
};

const ordersRequestAPI = () => {
    return {
        type:actionTypes.FETCH_ORDERS_REQUEST,
    }
};

const purchaseRequestSuccess = (orders) => {
    return {
        type:actionTypes.FETCH_PURCHASE_SUCCESS,
        payload:orders,
    }
};

const purchaseRequestFailure = (error) => {
    return {
        type:actionTypes.FETCH_PURCHASE_FAILURE,
        payload:error
    }
};

const purchaseRequestAPI = () => {
    return {
        type:actionTypes.FETCH_PURCHASE_REQUEST,
    }
};

// axios call here
export const fetchOrders = () => {
    return dispatch => {
        dispatch(ordersRequestAPI());
        const headers = {
            'headers' : {
                'Authorization' : 'Bearer '+ localStorage.getItem('token'),
                // 'Accept' : 'application/json',
                // 'Access-Control-Allow-Origin' : '*',
                // 'Access-Control-Allow-Headers' : 'Origin, Accept, Content-Type, X-Requested-With',
                // 'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            }
        };
        axios.get('/orders',headers)
        .then(response => {
            const orders = response.data;
            dispatch(ordersRequestSuccess(orders));
        })
        .catch(error=>{
            const errorMessage = error.response ? error.response.data.message : error.toString();
            dispatch(ordersRequestFailure(errorMessage))
        })
    }
};

export const purchaseOrders = (orderData) => {
    return dispatch => {
        dispatch(purchaseRequestAPI());
        const headers = {
            'headers' : {
                'Authorization' : 'Bearer '+ localStorage.getItem('token'),
                // 'Accept' : 'application/json',
                // 'Access-Control-Allow-Origin' : '*',
                // 'Access-Control-Allow-Headers' : 'Origin, Accept, Content-Type, X-Requested-With',
                // 'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            }
        };
        axios.post('/store',orderData,headers)
        .then(response => {
            const orders = response.data;
            dispatch(purchaseRequestSuccess(orders));
        })
        .catch(error=>{
            const errorMessage = error.response ? error.response : error;
            dispatch(purchaseRequestFailure(errorMessage))
        })
    }
};




