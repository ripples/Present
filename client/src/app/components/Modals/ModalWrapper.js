import React from 'react';
const {PropTypes} = React;
import Modal from 'react-bootstrap';
import {connect} from 'react-redux';
import * as modalActions from '../Actions/modalActions.js';

class ModalWrapper extends React.Component {

  constructor(props){
    super(props);
  }

  render() {
    <div className="modal-container" style={this.props.containerStyle}>
      <Modal show={this.props.modal.modalState} onHide={this.onHideModal} container={this} aria-labelledby="modal-title" animation={this.props.animation} keyboard={this.props.keyboard}>
        <Modal.Header closeButton style={this.props.headerStyle}>
          <Modal.Title id="modal-title">
            {this.props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {this.props.body}
        </Modal.Body>
        <Modal.Footer style={this.props.footerStyle}>
          {this.props.footerBtns}
          <Button onClick={this.onHideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  }
}

ModalWrapper.propTypes = {
  // props
  title: PropTypes.string.isRequired,
  containerStyle: PropTypes.object,
  headerStyle: PropTypes.object,
  footerStyle: PropTypes.object,
  animation: PropTypes.boolean,
  keyboard: PropTypes.boolean,
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

  // methods
  onHideModal: PropTypes.func,
};

ModalWrapper.defaultProps = {
  title: 'Modal Title',
  body: "Modal Body"
  animation: true,
  keyboard: true,
  footerBtns: [],
  containerStyle: {},
  headerStyle: {},
  footerStyle: {},
  onHideModal: () => {this.props.setModalState(false)}
};

const mapStateToProps = state => {
  return {
    modal: state.modal,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    setModalState: (state) => dispatch(setModalState(state))
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalWrapper);
