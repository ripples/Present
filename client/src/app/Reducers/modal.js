import {modalConstants} from '../Constants/actions.js';

export default function modal(state = initialState, action){
    switch(action.type){

        case modalConstants.SHOW_MODAL:
          return {
            modalType: action.modalType,
          };

          case modalConstants.HIDE_MODAL:
            return initialState;

        default:
            return state;
    }
}

const initialState = {
    modalType: null
  }
