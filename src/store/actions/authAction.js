import * as actionTypes from './actionTypes';

export const authRequestSuccess = (user,token) => {
    return {
        type:actionTypes.FETCH_AUTH_SUCCESS,
        payload:user,
        token : token
    }
};

export const authRequestFailure = (error) => {
    return {
        type:actionTypes.FETCH_AUTH_FAILURE,
        payload:error
    }
};

export const authRequestAPI = () => {
    return {
        type:actionTypes.FETCH_AUTH_REQUEST,
    }
};

export const authLogout = () => {
    return {
        type:actionTypes.FETCH_AUTH_LOGOUT_INITIAL,
    }
}

export const authLogoutSuccess = () => {
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

export const authCheckExpire = (timeout) => {
    return {
        type : actionTypes.FETCH_AUTH_CHECK_EXPIRE_INITIAL,
        timeout : timeout
    }
};

export const authenticateUser = (authData,isSignUp) => {
    return {
        type : actionTypes.FETCH_AUTH_INITIAL,
        authData : authData,
        isSignUp : isSignUp
    }
}

export const isLoggedIn = () => {
    return {
        type : actionTypes.FETCH_AUTH_CHECK_LOGIN_INITIAL
    }
}