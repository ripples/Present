import {modalConstants} from '../Constants/actions.js';

export default function modal(state = modalInit, action){
    switch(action.type){
        case modalConstants.SET_MODAL_STATE:
          return {
            isOpen: action.isOpen,
            currentModal: state.currentModal
          };

          case modalConstant.SET_CURRENT_MODAL:
            return {
              isOpen: state.isOpen,
              currentModal: action.currentModal
            }

        default:
            return state;
    }
}

const modalInit = {
    isOpen: false,
    currentModal: null
  }
