import {put} from 'redux-saga/effects';
import * as actionCreator from '../actions/actions';
import axios from '../../axios-orders';

export function* fetchOrdersSaga (action) {
    yield put(actionCreator.ordersRequestAPI());
    const token = yield localStorage.getItem('token');
    try {
        const headers = {
            'headers' : {
                'Authorization' : 'Bearer '+ token,
                // 'Accept' : 'application/json',
                // 'Access-Control-Allow-Origin' : '*',
                // 'Access-Control-Allow-Headers' : 'Origin, Accept, Content-Type, X-Requested-With',
                // 'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            }
        };
        let url = action.page ? '/orders?page='+action.page : '/orders';
        let response = yield axios.get(url,headers);
        const orders = response.data;
        yield put(actionCreator.ordersRequestSuccess(orders));

    } catch (error) {
        const errorMessage = error.response ? error.response.data.message : error.toString();
        yield put(actionCreator.ordersRequestFailure(errorMessage));
    }
}

export function* purchaseOrdersSaga (action) {
    yield put(actionCreator.purchaseRequestAPI());
    const token = yield localStorage.getItem('token');
    try {
        const headers = {
            'headers' : {
                'Authorization' : 'Bearer '+ token,
                // 'Accept' : 'application/json',
                // 'Access-Control-Allow-Origin' : '*',
                // 'Access-Control-Allow-Headers' : 'Origin, Accept, Content-Type, X-Requested-With',
                // 'Access-Control-Allow-Methods' : 'GET, POST, PATCH, PUT, DELETE, OPTIONS'
            }
        };
        let response = yield axios.post('/store',action.orderData,headers);
        const orders = response.data;
        yield put(actionCreator.purchaseRequestSuccess(orders));

    } catch (error) {
        const errorMessage = error.response ? error.response : error;
        yield put(actionCreator.purchaseRequestFailure(errorMessage));
    }
}