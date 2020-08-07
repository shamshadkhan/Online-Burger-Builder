import {takeEvery,takeLatest,all} from 'redux-saga/effects';
import {
    authLogoutSaga,
    authCheckExpireSaga,
    isLoggedInSaga,
    authenticateUserSaga
} from './authSaga';
import {
    fetchBurgerInitialsSaga
} from './burgerSaga';
import {
    fetchOrdersSaga,
    purchaseOrdersSaga
} from './orderSaga';
import * as actionTypes from '../actions/actionTypes';

export function* rootSaga() {
    //takeevery=> allows multiple fetchData instances to be started concurrently (previous request is not cancelled)
    //takelatest=> allows only one fetchData task to run at any moment (previous request is cancelled)
    //all=> concurrent axios execution will not wait for previous request to finish
    yield all([
        takeEvery(actionTypes.FETCH_AUTH_LOGOUT_INITIAL,authLogoutSaga),
        takeEvery(actionTypes.FETCH_AUTH_CHECK_EXPIRE_INITIAL,authCheckExpireSaga),
        takeEvery(actionTypes.FETCH_AUTH_INITIAL,authenticateUserSaga),
        takeEvery(actionTypes.FETCH_AUTH_CHECK_LOGIN_INITIAL,isLoggedInSaga),
        takeEvery(actionTypes.FETCH_BURGER_INITIAL_INITIAL,fetchBurgerInitialsSaga),
        takeEvery(actionTypes.FETCH_ORDERS_REQUEST_INITIAL,fetchOrdersSaga),
        
        takeLatest(actionTypes.FETCH_PURCHASE_REQUEST_INITIAL,purchaseOrdersSaga),
    ])
}