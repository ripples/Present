import {calFormConstants} from '../Constants/actions.js';

export function setCalSDate(sDate){
    return {
        type: calFormConstants.SET_CAL_S_DATE,
        sDate
    }
}

export function setCalEDate(eDate){
    return {
        type: calFormConstants.SET_CAL_E_DATE,
        eDate
    }
}

export function setCalSTime(sTime){
    return {
        type: calFormConstants.SET_CAL_S_TIME,
        sTime
    }
}

export function setCalETime(eTime){
    return {
        type: calFormConstants.SET_CAL_E_TIME,
        eTime
    }
}

export function setCalRecurDays(recurDays){
    return {
        type: calFormConstants.SET_CAL_RECUR_DAYS,
        recurDays
    }
}

export function setCalExcludeDates(excludeDates){
    return {
        type: calFormConstants.SET_CAL_EXCLUDE_DATES,
        excludeDates
    }
}

export function setCalIncludeDates(includeDates){
    return {
        type: calFormConstants.SET_CAL_INCLUDE_DATES,
        includeDates
    }
}

export function setCalDescription(description){
    return {
        type: calFormConstants.SET_CAL_DESCRIPTION,
        description
    }
}

export function setCalLoc(location){
    return {
        type: calFormConstants.SET_CAL_LOC,
        location
    }
}

export function setCalCourseId(courseId){
    return {
        type: calFormConstants.SET_CAL_COURSE_ID,
        courseId
    }
}

export function clearForm(){
    return {
        type: calFormConstants.CLEAR_FORM
    }
}