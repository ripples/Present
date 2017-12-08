import {lectureImageConstants} from '../Constants/actions.js';

export function setLectureImage(image){
    return {
        type: lectureImageConstants.SET_LECTURE_IMAGE,
        image
    }
}

export function clearLectureImage(){
    return {
        type: lectureImageConstants.CLEAR_LECTURE_IMAGE
    }
}

export function setImageType(imageType){
    return {
        type: lectureImageConstants.SET_IMAGE_TYPE,
        imageType
    }
}

export function setIndex(index){
    return {
        type: lectureImageConstants.SET_INDEX,
        index
    }
}
