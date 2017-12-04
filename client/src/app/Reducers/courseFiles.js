import {SET_COURSE_FILES} from '../Constants/actions.js';

export default function courseFiles(state = {}, action){
    switch(action.type){
        case SET_COURSE_FILES:
            return action.files;

        default:
            return state;
    }
}