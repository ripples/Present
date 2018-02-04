import React from 'react';
import {connect} form 'react-redux';

import * as actions from '../Actions/modalActions.js';
import AddEventModal from './AddEventModal.js';
import EditEventModal from './EditEventModal.js';

const ModalConductor = props => {
  switch(props.currentModal) {
    case 'ADD EVENT':
      props.setCurrentModal('ADD EVENT');
      return <AddEventModal {...props}/>;

    case 'EDIT EVENT':
      props.setCurrentModal('EDIT EVENT');
      return <EditEventModal {...props}/>;

    default:
      props.setCurrentModal(null);
      return null;
  }
};

const mapStateToProps = state => {
  return {
    currentModal: state.modal.currentModal,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setCurrentModal: (modal) => dispatch(setCurrentModal(modal))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalConductor);
