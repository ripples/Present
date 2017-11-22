import {SET_LECTURE_MANIFEST} from '../Constants/actions.js';

export default function lectureManifest(state = {}, action){
    switch(action.type){
        case SET_LECTURE_MANIFEST:
            return action.manifest;

        default:
            return state;
    }
}