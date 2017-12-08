import {lectureImageConstants} from '../Constants/actions.js';

export default function lectureImage(state = initialState, action){
    switch(action.type){
        case lectureImageConstants.SET_LECTURE_IMAGE :
            return {
                image: action.image,
                type: state.type,
                index: state.index
            };

        case lectureImageConstants.CLEAR_LECTURE_IMAGE :
            return {
                image: "",
                type: "",
                index: ""
            };

        case lectureImageConstants.SET_IMAGE_TYPE :
            return {
                image: state.image,
                type: action.imageType,
                index: state.index
            };
        
        case lectureImageConstants.SET_INDEX :
            return {
                image: state.image,
                type: state.type,
                index: action.index
            };

        default:
            return state;
    }
}

var initialState = {
    image: "",
    type: "",
    index: ""
}
