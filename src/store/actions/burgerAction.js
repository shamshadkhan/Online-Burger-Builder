import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

const burgerInitialRequestSuccess = (initials) => {
    return {
        type:actionTypes.FETCH_BURGER_INITIAL_SUCCESS,
        payload:initials
    }
};

const burgerInitialRequestFailure = (error) => {
    return {
        type:actionTypes.FETCH_BURGER_INITIAL_FAILURE,
        payload:error
    }
};

const burgerInitialRequestAPI = () => {
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


// axios call
export const fetchBurgerInitials = () => {
    return dispatch => {
        dispatch(burgerInitialRequestAPI())
        axios.get('/initial')
        .then(response => {
            const data = response.data;
            dispatch(burgerInitialRequestSuccess({
                ingredients: data.ingredients,
                totalPrice:data.price,
                ingredientsPrice:data.ingredientsPrice,
            }));
        })        
        .catch(error => {
            dispatch(burgerInitialRequestFailure(error));
        })
    }
}