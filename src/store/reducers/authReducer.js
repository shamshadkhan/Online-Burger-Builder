import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading : false,
    error : null,
    user : null,
    loginStatus : false,
    token : null,
    redirectPath : '/'

}

const Reducer = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.FETCH_AUTH_REQUEST:
            return {
                ...state,
                loading : true,
                token : null,
                error : null,
                loginStatus : false
            }
        case actionTypes.FETCH_AUTH_SUCCESS:
            return {
                ...state,
                user : action.payload,
                token : action.token,
                loading : false,
                error : null
            }
        case actionTypes.FETCH_AUTH_FAILURE:
            return {
                ...state,
                loading : false,
                token : null,
                error : action.payload,
            }
        case actionTypes.FETCH_AUTH_LOGOUT:
            return {
                ...state,
                user : null,
                token : null,
                loginStatus : false
            }
        case actionTypes.FETCH_AUTH_REDIRECT_PATH:
            return {
                ...state,
                redirectPath:action.path
            }
        default: return state;
    }
}

export default Reducer;