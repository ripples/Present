import React from 'react';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {hideMessage} from '../../Actions/messageActions.js';
import {confirmable} from 'react-confirm';

class ConfirmationMessage extends React.Component {
  render() {
    const {
      okLabel = "OK",
      cancelLabel = 'Cancel',
      title,
      confirmation,
      show,
      proceed,
      dismiss,
      cancel,
      enableEscape = true,
      bodyStyle,
    } = this.props;
    return (
      <Modal show={show} aria-labelledby="modal-title" animation={true} keyboard={enableEscape} onHide={dismiss}>
        <Modal.Header style={headerStyle}>
          <Modal.Title id="modal-title" style={titleStyle}>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={bodyStyle}>
          {confirmation}
        </Modal.Body>
        <Modal.Footer style={footerStyle}>
          <button onClick={proceed} style={modalBtnStyle}>{okLabel}</button>
          <button onClick={cancel} style={modalBtnStyle}>{cancelLabel}</button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ConfirmationMessage.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func,     // called when ok button is clicked.
  cancel: PropTypes.func,      // called when cancel button is clicked.
  dismiss: PropTypes.func,     // called when backdrop is clicked or escaped.
  enableEscape: PropTypes.bool,
  bodyStyle: PropTypes.object,
}

const modalBtnStyle = {
  display: 'inline',
  margin: '10px 5px 10px 5px',
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "4px",
  paddingBottom: "4px",
  backgroundColor: "white",
  borderRadius: "4px",
  color: "#000080"
}

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

export default confirmable(ConfirmationMessage);
