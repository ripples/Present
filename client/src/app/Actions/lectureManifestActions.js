import {SET_LECTURE_MANIFEST} from '../Constants/actions.js';

export function setLectureManifest(manifest){
    return {
        type: SET_LECTURE_MANIFEST,
        manifest
    }
}