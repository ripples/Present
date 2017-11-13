import {combineReducers} from 'redux'
import {SET_TOKEN, SET_COURSE_FILES} from '../Actions/action.js';

function token(state = {}, action){
    switch(action.type){
        case SET_TOKEN:
            return action.token;

        default:
            return state;
    }
}

function courseFiles(state = {}, action){
    switch(action.type){
        case SET_COURSE_FILES:
            return action.files;

        default:
            return state;
    }
}


const appReducer = combineReducers({
    token,
    courseFiles
});

export default appReducer;
