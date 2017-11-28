import {deleteLectureConstants} from '../Constants/actions.js';

export function setDeleteLecture(lecture){
    return {
        type: deleteLectureConstants.SET_DELETE_LECTURE,
        lecture
    }
}

export function clearDeleteLecture(){
    return {
        type: deleteLectureConstants.CLEAR_DELETE_LECTURE
    }
}