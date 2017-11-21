import {calFormConstants} from '../Constants/actions.js';

export function setCalOriginalCal(originalCal){
  return {
    type: calFormConstants.SET_CAL_ORIGINAL_CAL,
    originalCal
  }
}

export function setCalShowRecur(showRecur){
  return {
    type: calFormConstants.SET_CAL_SHOW_RECUR,
    showRecur
  }
}

export function setCalModalState(modalState){
  return {
    type: calFormConstants.SET_CAL_MODAL_STATE,
    modalState
  }
}

export function setCalMessageState(messageState){
  return {
    type: calFormConstants.SET_CAL_MESSAGE_STATE,
    messageState
  }
}

export function setCalMessageText(messageText){
  return {
    type: calFormConstants.SET_CAL_MESSAGE_TEXT,
    messageText
  }
}

export function setCalMessageTitle(messageTitle){
  return {
    type: calFormConstants.SET_CAL_MESSAGE_TITLE,
    messageTitle
  }
}

export function setCalEvents(events){
  return {
    type: calFormConstants.SET_CAL_EVENTS,
    events
  }
}

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

export function setCalRepeatDays(repeatDays){
    return {
        type: calFormConstants.SET_CAL_REPEAT_DAYS,
        repeatDays
    }
}

export function setCalRecurrence(recurrence){
  return {
    type: calFormConstants.SET_CAL_RECURRENCE,
    recurrence
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
