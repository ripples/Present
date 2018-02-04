import {messageConstants} from '../Constants/actions.js';

export function setMessageState(state){
  return {
    type: messageConstants.SET_MESSAGE_STATE,
    state
  }
}

export function setMessageText(text){
  return {
    type: messageConstants.SET_MESSAGE_TEXT,
    text
  }
}

export function setMessageTitle(title){
  return {
    type: messageConstants.SET_MESSAGE_TITLE,
    title
  }
}
