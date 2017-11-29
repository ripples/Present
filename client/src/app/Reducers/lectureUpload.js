import {lectureUploadConstants} from '../Constants/actions.js';

export default function lectureUpload(state = initialState, action){
    switch(action.type){
        case lectureUploadConstants.SET_LECTURE_FILE:
            return {
                lectureFile: action.file,
                lectureDate: state.lectureDate
            }

        case lectureUploadConstants.SET_LECTURE_DATE:
            return {
                lectureFile: state.lectureFile,
                lectureDate: action.date
            }

        case lectureUploadConstants.CLEAR_UPLOAD:
            return initialState;
        
        default:
            return state;
    }
}

var initialState = {
    lectureFile: "",
    lectureDate: ""
}