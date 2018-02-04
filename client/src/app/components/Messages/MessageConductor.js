import React from 'react';
import {connect} form 'react-redux';

import * as actions from '../Actions/messageActions.js';
import HelpMessage from './HelpMessage.js';
import WarningMessage from './WarningMessage.js';
import ConfirmationMessage from './ConfirmationMessage.js';

const MessageConductor = props => {
  switch(props.currentMessage) {
    case 'HELP':
      return <HelpMessage {...props}/>;

    case 'WARNING':
      return <WarningMessage {...props}/>;

    case 'CONFIRM':
      return <ConfirmationMessage {...props}/>;

    default:
      return null;
  }
};

export default connect(state => state, () => actions)(MessageConductor);
