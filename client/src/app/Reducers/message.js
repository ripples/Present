import {messageConstants} from '../Constants/actions.js';

export default function message(state = initialState, action){
    switch(action.type){
        case messageConstants.SHOW_MESSAGE:
          return {
            messageType: action.messageType,
            title: state.title,
            body: state.body,
            confirmed: state.confirmed
          };

        case messageConstants.SET_MESSAGE_TITLE:
          return {
            messageType: state.messageType,
            title: action.title,
            body: state.body,
            confirmed: state.confirmed
          };

        case messageConstants.SET_MESSAGE_BODY:
          return {
            messageType: state.messageType,
            title: state.title,
            body: action.body,
            confirmed: state.confirmed
          };

        case messageConstants.HIDE_MESSAGE:
          return {
            messageType: null,
            title: {},
            body: {},
            confirmed: null
          };

      case messageConstants.SET_CONFIRM:
        return {
          messageType: state.messageType,
          title: state.title,
          body: state.body,
          confirmed: action.confirmed
        }

        default:
            return state;
    }
}

const initialState = {
    messageType: null,
    title: {},
    body: {},
    confirmed: null
  }
