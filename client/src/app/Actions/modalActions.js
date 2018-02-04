import {modalConstants} from '../Constants/actions.js';

export function showModal(modalType){
  return {
    type: modalConstants.SHOW_MODAL,
    modalType
  }
}

export function hideModal(){
  return {
    type: modalConstants.HIDE_MODAL
  }
}
