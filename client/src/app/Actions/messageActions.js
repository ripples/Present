import {messageConstants} from '../Constants/actions.js';

export function showMessage(messageType) {
  return {
    type: messageConstants.SHOW_MESSAGE,
    messageType
  }
}

export function hideMessage() {
  return {
    type: messageConstants.HIDE_MESSAGE
  }
}

export function setMessageTitle(title){
    return {
      type: messageConstants.SET_MESSAGE_TITLE,
      title
  }
}

export function setMessageBody(body){
  return {
    type: messageConstants.SET_MESSAGE_BODY,
    body
  }
}

export function setConfirmed(confirmed){
  return {
    type: messageConstants.SET_CONFIRMED,
    confirmed
  }
}
