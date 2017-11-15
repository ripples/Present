import {SET_LECTURE_TIME} from '../Constants/actions.js';

export function setLectureTime(newTime){
    return {
        type: SET_LECTURE_TIME,
        time: newTime
    }
}
