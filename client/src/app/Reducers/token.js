import {SET_TOKEN} from '../Constants/actions.js';

export default function token(state = {}, action){
    switch(action.type){
        case SET_TOKEN:
            return action.token;

        default:
            return state;
    }
}