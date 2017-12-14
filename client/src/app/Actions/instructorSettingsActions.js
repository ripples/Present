import {instructorSettingsConstants} from '../Constants/actions';

export function setInstructorPage(page) {
    return {
        type: instructorSettingsConstants.SET_INSTRUCTOR_PAGE,
        page
    }
}

export function clearInstructorPage() {
    return {
        type: instructorSettingsConstants.CLEAR_INSTRUCTOR_PAGE
    }
}

export function setStatusMessage(status) {
    return {
        type: instructorSettingsConstants.SET_STATUS_MESSAGE,
        status
    }
}

export function clearStatusMessage() {
    return {
        type: instructorSettingsConstants.CLEAR_STATUS_MESSAGE
    }
}

export function setRoomModalState(modalState){
  return {
    type: instructorSettingsConstants.SET_ROOM_MODAL_STATE,
    modalState
  }
}

export function setRoomOptions(roomOptions){
  return {
    type: instructorSettingsConstants.SET_ROOM_OPTIONS,
    roomOptions
  }
}
