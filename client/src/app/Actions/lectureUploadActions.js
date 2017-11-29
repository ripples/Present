import {lectureUploadConstants} from '../Constants/actions.js';

export function setLectureFile(file){
    
    return {
        type: lectureUploadConstants.SET_LECTURE_FILE,
        file
    }
}

export function setLectureDate(date){
    
    return {
        type: lectureUploadConstants.SET_LECTURE_DATE,
        date
    }
}

export function clearUpload(){
    
    return {
        type: lectureUploadConstants.CLEAR_UPLOAD
    }
}