import {combineReducers} from 'redux';
import burgerBuilder from './burgerReducer';
import burgerOrder from './orderReducer';
import authUser from './authReducer';

const rootReducer = combineReducers ({
    burgerBuilder : burgerBuilder,
    burgerOrder : burgerOrder,
    authUser : authUser
});

export default rootReducer;