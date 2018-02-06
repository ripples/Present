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

export function setCalRoom(room){
  return {
    type: calFormConstants.SET_CAL_ROOM,
    room
  }
}

export function setCalURL(url){
  return {
    type: calFormConstants.SET_CAL_URL,
    url
  }
}

export function setCalHexColor(hexColor){
  return {
    type: calFormConstants.SET_CAL_HEX_COLOR,
    hexColor
  }
}

export function setCalMultidayEvent(multidayEvent){
  return {
    type: calFormConstants.SET_CAL_MULTIDAY_EVENT,
    multidayEvent
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

export function initForm(){
  return {
    type: calFormConstants.INIT_FORM
  }
}
