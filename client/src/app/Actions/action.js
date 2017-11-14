
export const SET_TOKEN = 'SET_TOKEN';
export const SET_COURSE_FILES = 'SET_COURSE_FILES';
export const SET_LECTURE_MANIFEST = 'SET_LECTURE_MANIFEST';
export const SET_LECTURE_TIME = 'SET_LECTURE_TIME';

export const SET_CAL_S_DATE = 'SET_CAL_S_DATE';
export const SET_CAL_E_DATE = 'SET_CAL_E_DATE';
export const SET_CAL_S_TIME = 'SET_CAL_S_TIME';
export const SET_CAL_E_TIME = 'SET_CAL_E_TIME';
export const SET_CAL_RECUR_DAYS = 'SET_CAL_RECUR_DAYS';
export const SET_CAL_EXCLUDE_DATES = 'SET_CAL_EXCLUDE_DATES';
export const SET_CAL_INCLUDE_DATES = 'SET_CAL_INCLUDE_DATES';
export const SET_CAL_CUR_EX_DATES = 'SET_CAL_CUR_EX_DATES';
export const SET_CAL_CUR_INC_DATES = 'SET_CAL_CUR_INC_DATES';
export const SET_CAL_DESCRIPTION = 'SET_CAL_DESCRIPTION';
export const SET_CAL_LOC = 'SET_CAL_LOC';
export const SET_CAL_COURSE_ID = 'SET_CAL_COURSE_ID';
export const CLEAR_FORM = 'CLEAR_FORM';


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

export function setLectureTime(newTime){
    return {
        type: SET_LECTURE_TIME,
        time: newTime
    }
}

export function setCalSDate(date){
    return {
        type: SET_CAL_S_DATE,
        date
    }
}

export function setCalEDate(date){
    return {
        type: SET_CAL_E_DATE,
        date
    }
}

export function setCalSTime(time){
    return {
        type: SET_CAL_S_TIME,
        time
    }
}

export function setCalETime(time){
    return {
        type: SET_CAL_E_TIME,
        time
    }
}

export function setCalRecurDays(recurDays){
    return {
        type: SET_CAL_RECUR_DAYS,
        recurDays
    }
}

export function setCalExcludeDates(excludeDates){
    return {
        type: SET_CAL_EXCLUDE_DATES,
        excludeDates
    }
}

export function setCalIncludeDates(includeDates){
    return {
        type: SET_CAL_INCLUDE_DATES,
        includeDates
    }
}

export function setCalCurExDates(dates){
    return {
        type: SET_CAL_CUR_EX_DATES,
        dates
    }
}

export function setCalCurIncDates(dates){
    return {
        type: SET_CAL_CUR_INC_DATES,
        dates
    }
}

export function setCalDescription(desc){
    return {
        type: SET_CAL_DESCRIPTION,
        desc
    }
}

export function setCalLoc(location){
    return {
        type: SET_CAL_LOC,
        location
    }
}

export function setCalCourseId(courseId){
    return {
        type: SET_CAL_COURSE_ID,
        courseId
    }
}

export function clearForm(){
    return {
        type: CLEAR_FORM
    }
}