import {put} from 'redux-saga/effects'
import * as actionCreator from '../actions/actions';
import axios from '../../axios-orders';

export function* fetchBurgerInitialsSaga (action) {
    yield put(actionCreator.burgerInitialRequestAPI());
    try {
        let response = yield axios.get('/initial');
        const data = response.data;
        yield put(actionCreator.burgerInitialRequestSuccess({
            ingredients: data.ingredients,
            totalPrice:data.price,
            ingredientsPrice:data.ingredientsPrice,
        }))
    } 
    catch (error) {
        yield put(actionCreator.burgerInitialRequestFailure(error));
    }
}