import * as actionTypes from './actionTypes';

export const burgerInitialRequestSuccess = (initials) => {
    return {
        type:actionTypes.FETCH_BURGER_INITIAL_SUCCESS,
        payload:initials
    }
};

export const burgerInitialRequestFailure = (error) => {
    return {
        type:actionTypes.FETCH_BURGER_INITIAL_FAILURE,
        payload:error
    }
};

export const burgerInitialRequestAPI = () => {
    return {
        type:actionTypes.FETCH_BURGER_INITIAL_REQUEST,
    }
};

export const addIngredients = (value) => {
    return {
        type:actionTypes.ADD_INGREDIENTS,
        ingName:value
    }
} ;

export const removeIngredients = (value) => {
    return {
        type:actionTypes.REMOVE_INGREDIENTS,
        ingName:value
    }
};

export const fetchBurgerInitials = () => {
    return {
        type : actionTypes.FETCH_BURGER_INITIAL_INITIAL
    }
}