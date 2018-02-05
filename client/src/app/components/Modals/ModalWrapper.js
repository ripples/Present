import React from 'react';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

const ModalWrapper = props => {

  return (
    <Modal show={true} aria-labelledby="modal-title" animation={props.animation} keyboard={props.keyboard} onHide={props.hideModal}>
      <Modal.Header closeButton={true} style={props.headerStyle}>
        <Modal.Title id="modal-title" style={props.titleStyle}>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.body}
      </Modal.Body>
      <Modal.Footer style={props.footerStyle}>
          {props.footerBtns}
          <button onClick={props.hideModal} style={props.closeStyle}>{props.closeText}</button>
      </Modal.Footer>
    </Modal>
  );
};

const headerStyle = {
    textAlign: "center",
    backgroundColor: "#0074D9",
    borderRadius: "6px"
}

const titleStyle = {
  fontWeight: "bold",
  color: "white"
}

const footerStyle = {
  textAlign: "center",
}

ModalWrapper.propTypes = {
  // props
  title: PropTypes.string.isRequired,
  animation: PropTypes.bool,
  keyboard: PropTypes.bool,
  headerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  footerStyle: PropTypes.object,
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
  headerStyle: headerStyle,
  titleStyle: titleStyle,
  footerStyle: footerStyle,
  footerBtns: [],
  closeStyle: {},
  closeText: "Close",
  hideModal: () => {this.props.hideModal()}
};

export default ModalWrapper;
