import {calFormConstants} from '../Constants/actions.js';

export default function calendarForm(state = calInit, action){
    switch(action.type){
        case calFormConstants.SET_CAL_S_DATE:
            return {
                sDate: action.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: state.excludeDates,
                includeDates: state.includeDates,
                description: state.description,
                location: state.location,
                courseId: state.courseId
            };

        case calFormConstants.SET_CAL_E_DATE:
            return {
                sDate: state.sDate,
                eDate: action.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: state.excludeDates,
                includeDates: state.includeDates,
                description: state.description,
                location: state.location,
                courseId: state.courseId
            };

        case calFormConstants.SET_CAL_S_TIME:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: action.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: state.excludeDates,
                includeDates: state.includeDates,
                description: state.description,
                location: state.location,
                courseId: state.courseId
            };

        case calFormConstants.SET_CAL_E_TIME:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: action.eTime,
                recurDays: state.recurDays,
                excludeDates: state.excludeDates,
                includeDates: state.includeDates,
                description: state.description,
                location: state.location,
                courseId: state.courseId
            };

        case calFormConstants.SET_CAL_RECUR_DAYS:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: action.recurDays,
                excludeDates: state.excludeDates,
                includeDates: state.includeDates,
                description: state.description,
                location: state.location,
                courseId: state.courseId
            };

        case calFormConstants.SET_CAL_EXCLUDE_DATES:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: action.excludeDates,
                includeDates: state.includeDates,
                description: state.description,
                location: state.location,
                courseId: state.courseId
            };

        case calFormConstants.SET_CAL_INCLUDE_DATES:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: state.excludeDates,
                includeDates: action.includeDates,
                description: state.description,
                location: state.location,
                courseId: state.courseId
            };

        case calFormConstants.SET_CAL_DESCRIPTION:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: state.excludeDates,
                includeDates: state.includeDates,
                description: action.description,
                location: state.location,
                courseId: state.courseId
            };

        case calFormConstants.SET_CAL_LOC:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: state.excludeDates,
                includeDates: state.includeDates,
                description: state.description,
                location: action.location,
                courseId: state.courseId
            };

        case calFormConstants.SET_CAL_COURSE_ID:
            return {
                sDate: state.sDate,
                eDate: state.eDate,
                sTime: state.sTime,
                eTime: state.eTime,
                recurDays: state.recurDays,
                excludeDates: state.excludeDates,
                includeDates: state.includeDates,
                description: state.description,
                location: state.location,
                courseId: action.courseId
            };

        case calFormConstants.CLEAR_FORM:
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
    description: "",
    location: "",
    courseId: ""
  }