import {put,delay} from 'redux-saga/effects';
import * as actionCreator from '../actions/actions';
import axios from '../../axios-orders';

export function* authLogoutSaga (action) {    
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('userId');
    yield localStorage.removeItem('expireAt');
    yield localStorage.removeItem('username');
    yield localStorage.removeItem('user');
    yield put(actionCreator.authLogoutSuccess());
}

export function* authCheckExpireSaga (action) {
    yield delay(action.timeout);
    yield put(actionCreator.authLogout());
}

export function* authenticateUserSaga (action) {
    yield put(actionCreator.authRequestAPI());
    let url = action.isSignUp ? '/register' : '/login';
    try {
        let response = yield axios.post(url,action.authData);
        const user = response.data;
        const token = user.data ? user.data.api_token : null;
        //date in msec
        let expireTime_in_ms;
        let expire;
        if(!action.isSignUp){
            expireTime_in_ms = user.expireIn * 1000;
            expire = yield new Date (new Date().getTime() +  expireTime_in_ms);
            yield localStorage.setItem('expireAt',expire);
            yield localStorage.setItem('token',user.data.api_token);
            yield localStorage.setItem('userId',user.data.id);
            yield localStorage.setItem('username',user.data.name);
            yield localStorage.setItem('user',JSON.stringify(response));
        }        
        yield put(actionCreator.authRequestSuccess(response,token));
        if(!action.isSignUp){
            yield put(actionCreator.authCheckExpire(expireTime_in_ms));
        }
    } 
    catch (error) {
        yield put(actionCreator.authRequestFailure(error.response));
    }
}

export function* isLoggedInSaga (action) {
    const token = yield localStorage.getItem('token');
    const expire = yield localStorage.getItem('expireAt');
    if(token) {
        const currentExpireLimit = yield new Date(expire).getTime() > new Date().getTime();
        const expireTime_in_ms = yield (new Date(expire).getTime() - new Date().getTime());
        if(currentExpireLimit) {
            const userInfo = yield JSON.parse(localStorage.getItem('user'));
            yield put(actionCreator.authRequestSuccess(userInfo,token));
            yield put(actionCreator.authCheckExpire(expireTime_in_ms)); // convert sec to ms
        }
        else {
            yield put(actionCreator.authLogout());
        }
    }
    else {
        yield put(actionCreator.authLogout());
    }
}