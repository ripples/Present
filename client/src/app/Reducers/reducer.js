import {combineReducers} from 'redux'
import {SET_TOKEN} from '../Actions/action.js';

function token(state = {}, action){
    switch(action.type){
        case SET_TOKEN:
            return action.token;
            
        default:
            return state;
    }
}


const appReducer = combineReducers({
    token
});

export default appReducer;
