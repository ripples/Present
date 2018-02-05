import {modalConstants} from '../Constants/actions.js';

export default function modal(state = initialState, action){
    switch(action.type){

        case modalConstants.SHOW_MODAL:
          return {
            modalType: action.modalType,
            currentEvent: state.currentEvent
          };

        case modalConstants.HIDE_MODAL:
          return initialState;

        case modalConstants.SHOW_EVENT:
          return {
            modalType: 'VIEW_EVENT',
            currentEvent: action.currentEvent
          };

        default:
            return state;
    }
}

const initialState = {
    modalType: null,
    currentEvent: {}
  }
