import {calFormConstants} from '../Constants/actions.js';

export default function calendarForm(state = calInit, action){
    switch(action.type){
        case calFormConstants.SET_CAL_ORIGINAL_CAL:
          return {
            originalCal: action.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_SHOW_RECUR:
          return {
            originalCal: state.originalCal,
            showRecur: action.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_MULTIDAY_EVENT:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: action.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_MODAL_STATE:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: action.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_MESSAGE_STATE:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: action.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_MESSAGE_TEXT:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: action.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_MESSAGE_TITLE:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: action.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_EVENTS:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_S_DATE:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_E_DATE:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_S_TIME:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_E_TIME:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_REPEAT_DAYS:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_RECURRENCE:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_EXCLUDE_DATES:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_INCLUDE_DATES:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_DESCRIPTION:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: state.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_LOC:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
            location: action.location,
            courseId: state.courseId
          };

        case calFormConstants.SET_CAL_COURSE_ID:
          return {
            originalCal: state.originalCal,
            showRecur: state.showRecur,
            multidayEvent: state.multidayEvent,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
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
    originalCal: [],
    showRecur: false,
    multidayEvent: false,
    modalState: false,
    messageState: false,
    messageText: "",
    messageTitle: "",
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
    location: "",
    courseId: ""
  }
