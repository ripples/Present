import {combineReducers} from 'redux'
import {SET_TOKEN,
    SET_COURSE_FILES,
    SET_LECTURE_MANIFEST,
    SET_LECTURE_TIME,
    SET_CAL_S_DATE,
    SET_CAL_E_DATE,
    SET_CAL_S_TIME,
    SET_CAL_E_TIME,
    SET_CAL_RECUR_DAYS,
    SET_CAL_EXCLUDE_DATES,
    SET_CAL_INCLUDE_DATES,
    SET_CAL_CUR_EX_DATES,
    SET_CAL_CUR_INC_DATES,
    SET_CAL_DESCRIPTION,
    SET_CAL_LOC,
    SET_CAL_COURSE_ID,
    CLEAR_FORM
    } from '../Actions/action.js';

function token(state = {}, action){
    switch(action.type){
        case SET_TOKEN:
            return action.token;

        default:
            return state;
    }
}

function courseFiles(state = {}, action){
    switch(action.type){
        case SET_COURSE_FILES:
            return action.files;

        default:
            return state;
    }
}

function lectureManifest(state = {}, action){
    switch(action.type){
        case SET_LECTURE_MANIFEST:
            return action.manifest;

        default:
            return state;
    }
}

function lectureTime(state = 0, action){
    switch(action.type){
        case SET_LECTURE_TIME:
            return action.time;

        default:
            return state;
    }
}

function calendarForm(state = calInit, action){
    switch(action.type){
        case SET_CAL_S_DATE:
            return action.date;

        case SET_CAL_E_DATE:
            return action.date;

        case SET_CAL_S_TIME:
            return action.time;

        case SET_CAL_E_TIME:
            return action.time;

        case SET_CAL_RECUR_DAYS:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: action.recurDays,
                excludeDates: state.excludeDates,
                includeDates: state.includeDates,
                currentExclude: state.currentExclude,
                currentInclude: state.currentInclude,
                description: state.description,
                location: state.location,
                courseId: state.courseId
            };

        case SET_CAL_EXCLUDE_DATES:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: action.excludeDates,
                includeDates: state.includeDates,
                currentExclude: state.currentExclude,
                currentInclude: state.currentInclude,
                description: state.description,
                location: state.location,
                courseId: state.courseId
            };

        case SET_CAL_INCLUDE_DATES:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: state.excludeDates,
                includeDates: action.includeDates,
                currentExclude: state.currentExclude,
                currentInclude: state.currentInclude,
                description: state.description,
                location: state.location,
                courseId: state.courseId
            };

        case SET_CAL_CUR_EX_DATES:
            return action.dates;

        case SET_CAL_CUR_INC_DATES:
            return action.dates;

        case SET_CAL_DESCRIPTION:
            return action.desc;

        case SET_CAL_LOC:
            return action.location;

        case SET_CAL_COURSE_ID:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: state.excludeDates,
                includeDates: state.includeDates,
                currentExclude: state.currentExclude,
                currentInclude: state.currentInclude,
                description: state.description,
                location: state.location,
                courseId: action.courseId
            };

        case CLEAR_FORM:
            return calInit;
            
        default:
            return state;
    }
}

const calInit = {
    sDate: "",
    eDate: "",
    sTime: "",
    eTime: "",
    recurDays: [],
    excludeDates: [],
    includeDates: [],
    currentExclude: "",
    currentInclude: "",
    description: "",
    location: "",
    courseId: ""
  }


const appReducer = combineReducers({
    token,
    courseFiles,
    lectureManifest,
    lectureTime,
    calendarForm
});

export default appReducer;
