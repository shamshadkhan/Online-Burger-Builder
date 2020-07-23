import * as actionTypes from '../actions/actionTypes';

const initialState = {
    ingredients : null,
    totalPrice : 0,
    ingredientsPrice : null,
    loading : false,
    error : null,
    buildingBurger : false
}

const Reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingName] : state.ingredients[action.ingName] + 1
                },
                ingredientsPrice : {...state.ingredientsPrice},
                totalPrice : state.totalPrice + state.ingredientsPrice[action.ingName],
                buildingBurger : true
            }
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingName] : state.ingredients[action.ingName] - 1
                },
                ingredientsPrice : {...state.ingredientsPrice},
                totalPrice : state.totalPrice - state.ingredientsPrice[action.ingName],
                buildingBurger : true
            }
        case actionTypes.FETCH_BURGER_INITIAL_REQUEST:
            return {
                ...state,
                loading : true
            }
        case actionTypes.FETCH_BURGER_INITIAL_SUCCESS:
            return {
                ...state,
                ingredients : action.payload.ingredients,
                totalPrice : action.payload.totalPrice,
                ingredientsPrice : action.payload.ingredientsPrice,
                loading : false,
                error: null,
                buildingBurger : false
            }
        case actionTypes.FETCH_BURGER_INITIAL_FAILURE:
            return {
                ...state,
                ingredients : null,
                loading : false,
                error: action.payload.toString()
            }
        default : return state
    }
}

export default Reducer;