import {SET_COURSE_FILES} from '../Constants/actions.js';

export function setCourseFiles(files){
    return {
        type: SET_COURSE_FILES,
        files
    }
}