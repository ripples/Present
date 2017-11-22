import {SET_LECTURE_TIME} from '../Constants/actions.js';

export default function lectureTime(state = 0, action){
    switch(action.type){
        case SET_LECTURE_TIME:
            return action.time;

        default:
            return state;
    }
}