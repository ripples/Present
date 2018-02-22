import React from 'react';
import {Modal} from 'react-bootstrap';
import PropTypes from 'prop-types';

const MessageWrapper = props => {

  return (
    <Modal show={props.show} aria-labelledby="modal-title" animation={props.animation} keyboard={props.keyboard} onHide={props.onDestroyDialog}>
      <Modal.Header closeButton={true} style={props.headerStyle}>
        <Modal.Title id="modal-title" style={props.titleStyle}>
          {props.title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={props.bodyStyle}>
        {props.body}
      </Modal.Body>
      <Modal.Footer style={props.footerStyle}>
          {props.footerBtns}
          <button onClick={props.onCloseBtn} style={props.closeStyle}>{props.closeText}</button>
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

const closeStyle = {
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

/*const bodyStyle = {
  textAlign: 'center'
}*/

MessageWrapper.propTypes = {
  // props
  show: PropTypes.bool.isRequired,
  title: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]).isRequired,
  animation: PropTypes.bool,
  keyboard: PropTypes.bool,
  headerStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
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
  ]),
  closeText: PropTypes.string,
  closeStyle: PropTypes.object,

  // methods
  onDestroyDialog: PropTypes.func.isRequired,
  onCloseBtn: PropTypes.func.isRequired,
};

MessageWrapper.defaultProps = {
  title: 'Modal Title',
  body: "Modal Body",
  animation: true,
  keyboard: true,
  headerStyle: headerStyle,
  titleStyle: titleStyle,
  footerStyle: footerStyle,
  bodyStyle: {},
  footerBtns: [],
  closeStyle: closeStyle,
  closeText: "Okay",
  onCloseBtn: () => {this.props.onCloseBtn()},
  onDestroyDialog: () => {this.props.onDestroyDialog()}
};

export default MessageWrapper;
