import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {hideModal} from '../../Actions/modalActions.js';

class ModalWrapper extends React.Component {

  render() {
    return (
      <div className="modal-container" style={this.props.style}>
        <Modal show={true} container={this} aria-labelledby="modal-title" animation={this.props.animation} keyboard={this.props.keyboard} onHide={this.props.hideModal}>
          <Modal.Header closeButton={true}>
            <Modal.Title id="modal-title">
              {this.props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.props.body}
          </Modal.Body>
          <Modal.Footer>
            <div style={{textAlign: 'center'}}>
              {this.props.footerBtns}
              <button onClick={this.props.hideModal} style={this.props.closeStyle}>{this.props.closeText}</button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ModalWrapper.propTypes = {
  // props
  title: PropTypes.string.isRequired,
  style: PropTypes.object,
  animation: PropTypes.bool,
  keyboard: PropTypes.bool,
  body: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
  footerBtns: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.element,
    PropTypes.object,
  ]).isRequired,
  closeText: PropTypes.string,
  closeStyle: PropTypes.object,

  // methods
  hideModal: PropTypes.func,
};

ModalWrapper.defaultProps = {
  title: 'Modal Title',
  body: "Modal Body",
  animation: true,
  keyboard: true,
  footerBtns: [],
  style: {},
  closeStyle: {},
  closeText: "Close",
  hideModal: () => {this.props.hideModal()}
};

const mapStateToProps = state => {
  return {
    modal: state.modal
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideModal: () => dispatch(hideModal())
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);
