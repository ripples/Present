import {calFormConstants} from '../Constants/actions.js';

export default function calendarForm(state = calInit, action){
    switch(action.type){
        case calFormConstants.SET_CAL_SHOW_RECUR:
          return {
            showRecur: action.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: action.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: action.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: action.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: action.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: action.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: action.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: action.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
            showRecur: state.showRecur,
            modalState: state.modalState,
            messageState: state.messageState,
            messageText: state.messageText,
            messageTitle: state.messageTitle,
            events: state.events,
            sDate: state.sDate,
            eDate: state.eDate,
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
    showRecur: false,
    modalState: false,
    messageState: false,
    messageText: "",
    messageTitle: "",
    events: [],
    sDate: "",
    eDate: "",
    repeatDays: [],
    recurrence: [],
    excludeDates: [],
    includeDates: [],
    description: "",
    location: "",
    courseId: ""
  }
