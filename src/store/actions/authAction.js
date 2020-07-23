import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const authRequestSuccess = (user,token) => {
    return {
        type:actionTypes.FETCH_AUTH_SUCCESS,
        payload:user,
        token : token
    }
};

const authRequestFailure = (error) => {
    return {
        type:actionTypes.FETCH_AUTH_FAILURE,
        payload:error
    }
};

const authRequestAPI = () => {
    return {
        type:actionTypes.FETCH_AUTH_REQUEST,
    }
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('expireAt');
    localStorage.removeItem('username');
    localStorage.removeItem('user');
    return {
        type:actionTypes.FETCH_AUTH_LOGOUT,
    }
}

export const setRedirectPath = (path) => {
    return {
        type : actionTypes.FETCH_AUTH_REDIRECT_PATH,
        path : path
    }
}

// axios / async call here

const authCheckExpire = (timeout) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authLogout());
        }, timeout);
    }
};

export const authenticateUser = (authData,isSignUp) => {
    return dispatch => {
        dispatch(authRequestAPI());
        let url = isSignUp ? '/register' : '/login'; 
        axios.post(url,authData)
        .then(response => {
            const user = response.data;
            const token = user.data ? user.data.api_token : null;
            //date in msec
            let expireTime_in_ms;
            let expire;
            if(!isSignUp){
                expireTime_in_ms = user.expireIn * 1000;
                expire = new Date (new Date().getTime() +  expireTime_in_ms);
                localStorage.setItem('expireAt',expire);
                localStorage.setItem('token',user.data.api_token);
                localStorage.setItem('userId',user.data.id);
                localStorage.setItem('username',user.data.name);
                localStorage.setItem('user',JSON.stringify(response));
            }
            dispatch(authRequestSuccess(response,token));
            if(!isSignUp){
                dispatch(authCheckExpire(expireTime_in_ms));
            }
        })
        .catch(error=>{
            dispatch(authRequestFailure(error.response));
        })
    }
}

export const isLoggedIn = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expire = localStorage.getItem('expireAt');
        if(token) {
            const currentExpireLimit = new Date(expire).getTime() > new Date().getTime();
            const expireTime_in_ms = (new Date(expire).getTime() - new Date().getTime());
            if(currentExpireLimit) {
                const userInfo = JSON.parse(localStorage.getItem('user'));
                dispatch(authRequestSuccess(userInfo,token));
                dispatch(authCheckExpire(expireTime_in_ms)); // convert sec to ms
            }
            else {
                dispatch(authLogout());
            }
        }
        else {
            dispatch(authLogout());
        }
    }
}