import {deleteLectureConstants} from '../Constants/actions.js';

export default function deleteLecture(state = "", action){
    switch(action.type){
        case deleteLectureConstants.SET_DELETE_LECTURE :
            return action.lecture;

        case deleteLectureConstants.CLEAR_DELETE_LECTURE :
            return "";

        default:
            return state;
    }
}