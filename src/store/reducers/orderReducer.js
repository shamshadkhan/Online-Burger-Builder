import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders : [],
    loading : false,
    error : null,
    purchase : false
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ORDERS_REQUEST:
            return {
                ...state,
                loading : true,
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders : action.payload,
                loading : false,
                error: null,
                purchase : false
            }
        case actionTypes.FETCH_ORDERS_FAILURE:
            return {
                ...state,
                orders : null,
                loading : false,
                purchase : false,
                error: action.payload.toString()
            }
        case actionTypes.FETCH_PURCHASE_REQUEST:
            return {
                ...state,
                loading : true,
                purchase : false
            }
        case actionTypes.FETCH_PURCHASE_SUCCESS:
            return {
                ...state,
                orders : state.orders.concat(action.payload),
                loading : false,
                error: null,
                purchase : true
            }
        case actionTypes.FETCH_PURCHASE_FAILURE:
            return {
                ...state,
                orders : null,
                loading : false,
                error: action.payload.toString(),
                purchase : false
            }
        default : return state
    }
}

export default Reducer;