import {combineReducers} from 'redux'
import {SET_TOKEN, SET_COURSE_FILES, SET_LECTURE_MANIFEST, SET_LECTURE_TIME} from '../Actions/action.js';

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

function lectureManifest(state = {}, action){
    switch(action.type){
        case SET_LECTURE_MANIFEST:
            return action.manifest;

        default:
            return state;
    }
}

function lectureTime(state = 0, action){
    switch(action.type){
        case SET_LECTURE_TIME:
            return action.time;

        default:
            return state;
    }
}

const appReducer = combineReducers({
    token,
    courseFiles,
    lectureManifest,
    lectureTime
});

export default appReducer;
