import {SET_TOKEN} from '../Constants/actions.js';

export function setToken(token){
    return {
        type: SET_TOKEN,
        token
    }
}
