import {calFormConstants} from '../Constants/actions.js';

export default function calendarForm(state = initialState, action){
    switch(action.type){
        case calFormConstants.SET_CAL_ORIGINAL_CAL:
          return {
            originalCal: action.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_SHOW_RECUR:
          return {
            originalCal: state.originalCal,
            showRecur: action.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_ROOM:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: action.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_URL:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: action.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_HEX_COLOR:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: action.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_MULTIDAY_EVENT:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: action.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_EVENTS:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: action.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_S_DATE:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: action.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_E_DATE:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: action.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_S_TIME:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: action.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_E_TIME:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: action.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_REPEAT_DAYS:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: action.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_RECURRENCE:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: action.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_EXCLUDE_DATES:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: action.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_INCLUDE_DATES:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: action.includeDates,
            description: state.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_DESCRIPTION:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: action.description,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_COURSE_ID:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            room: state.room,
            url: state.url,
            hexColor: state.hexColor,
            multidayEvent: state.multidayEvent,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
            sTime: state.sTime,
            eTime: state.eTime,
            repeatDays: state.repeatDays,
            recurrence: state.recurrence,
            excludeDates: state.excludeDates,
            includeDates: state.includeDates,
            description: state.description,
            courseId: action.courseId
          };

        case calFormConstants.CLEAR_FORM:
            return {
              originalCal: state.originalCal,
              showRecur: false,
              room: state.room,
              url: state.url,
              hexColor: state.hexColor,
              multidayEvent: false,
              events: state.events,
              sDate: '',
              eDate: '',
              sTime: '',
              eTime: '',
              repeatDays: [],
              recurrence: [],
              excludeDates: [],
              includeDates: [],
              description: '',
              courseId: state.courseId
            };

        case calFormConstants.INIT_FORM:
            return initialState;

        default:
            return state;
    }
}

const initialState = {
    originalCal: [],
    showRecur: false,
    room: "",
    url: "",
    hexColor: "",
    multidayEvent: false,
    events: [],
    sDate: "",
    eDate: "",
    sTime: "",
    eTime: "",
    repeatDays: [],
    recurrence: [],
    excludeDates: [],
    includeDates: [],
    description: "",
    courseId: ""
  }
