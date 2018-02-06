import React from 'react';
import {connect} from 'react-redux';
import MessageWrapper from './MessageWrapper.js';
import {hideMessage} from '../../Actions/messageActions.js';


class CustomMessage extends React.Component {
  constructor(props){
    super(props);
  }

  onClose = () => {
    this.props.hideMessage();
  };

  render() {
    return (
      <MessageWrapper title="" body={this.props.message.body} hideMessage={this.onClose} />
    );
  }
}

const mapStateToProps = state => {
  return {
    message: state.message
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    hideMessage: () => dispatch(hideMessage()),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomMessage);
