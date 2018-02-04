import {modalConstants} from '../Constants/actions.js';

export function setModalState(state){
  return {
    type: modalConstants.SET_MODAL_STATE,
    state
  }
}

export function setCurrentModal(modal){
  return {
    type: modalConstants.SET_CURRENT_MODAL,
    modal
  }
}
