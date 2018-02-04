import {messageConstants} from '../Constants/actions.js';

export default function message(state = messageInit, action){
    switch(action.type){
        case messageConstants.SET_MESSAGE_STATE:
          return {
            isOpen: action.isOpen,
            text: state.text,
            title: state.title
          };

        case messageConstants.SET_MESSAGE_TEXT:
          return {
            isOpen: state.isOpen,
            text: action.text,
            title: state.title
          };

          case messageConstants.SET_MESSAGE_TITLE:
            return {
              isOpen: state.isOpen,
              text: action.text,
              title: state.title
            };

        default:
            return state;
    }
}

const messageInit = {
    isOpen: false,
    text: "",
    title: ""
  }
