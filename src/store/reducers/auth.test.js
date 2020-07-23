import Reducer from './authReducer';
import * as actionTypes from '../actions/actionTypes';

// other configure of enzyme not needed since no component wrapper test
describe('authReducer', () => {
    it('proper initialize', () => {
        //sent undefined data to get initial state
        expect(Reducer(undefined,{})).toEqual({
            loading : false,
            error : null,
            user : null,
            loginStatus : false,
            token : null,
            redirectPath : '/'
        
        });
    })

    it('proper success call', () => {
        //sent initial state and action type to execute and get the return value based on action params
        expect(Reducer({
            loading : false,
            error : null,
            user : null,
            loginStatus : false,
            token : null,
            redirectPath : '/'
        
        },
        {
            type:actionTypes.FETCH_AUTH_SUCCESS,
            payload : {
                name : 'xxxxxx',
                email : 'xxx@gmail.com'
            },
            token : 'some-token'
        }
        )).toEqual({
            loading : false,
            error : null,
            user : {
                name : 'xxxxxx',
                email : 'xxx@gmail.com'
            },
            loginStatus : false,
            token : 'some-token',
            redirectPath : '/'
        
        });
    })
})