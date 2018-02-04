import React from 'react';
import {connect} from 'react-redux';
import AddEventModal from './AddEventModal.js';
import EditEventModal from './EditEventModal.js';

const MODAL_COMPONENTS = {
  'ADD_EVENT': AddEventModal,
  'EDIT_EVENT': EditEventModal
}

const ModalConductor = props => {
  if(!props.modal.modalType) {
    return null
  }

  const DispatchedModal = MODAL_COMPONENTS[props.modal.modalType]
  return <DispatchedModal {...props} />
};

const mapStateToProps = state => {
  return {
    modal: state.modal
  };
}

export default connect(mapStateToProps)(ModalConductor);
