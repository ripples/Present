import React from 'react';
import {connect} from 'react-redux';
import CustomMessage from './CustomMessage.js';
import ConfirmationMessage from './ConfirmationMessage.js';

const MESSAGE_COMPONENTS = {
  'CUSTOM': CustomMessage,
  'CONFIRM': ConfirmationMessage
}

const MessageConductor = props => {
  if(!props.message.messageType) {
    return null
  }

  const DispatchedMessage = MESSAGE_COMPONENTS[props.message.messageType]
  return <DispatchedMessage />
};

const mapStateToProps = state => {
  return {
    message: state.message
  };
}

export default connect(mapStateToProps)(MessageConductor);
