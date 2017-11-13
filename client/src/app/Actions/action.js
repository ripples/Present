
export const SET_TOKEN = 'SET_TOKEN';
export const SET_COURSE_FILES = 'SET_COURSE_FILES';
export const SET_LECTURE_MANIFEST = 'SET_LECTURE_MANIFEST';

export function setToken(token){
    return {
        type: SET_TOKEN,
        token
    }
}

export function setCourseFiles(files){
    return {
        type: SET_COURSE_FILES,
        files
    }
}

export function setLectureManifest(manifest){
    return {
        type: SET_LECTURE_MANIFEST,
        manifest
    }
}