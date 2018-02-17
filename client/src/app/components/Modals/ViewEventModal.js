import React from 'react';
import {connect} from 'react-redux';
import {showModal, hideModal} from '../../Actions/modalActions.js';
import ModalWrapper from './ModalWrapper.js';
import {setCalEvents} from '../../Actions/calFormActions.js';


class ViewEventModal extends React.Component {

  showEditPane(event, e){
    if(e){
      e.preventDefault();
    }
    this.props.showModal('EDIT_EVENT');
  }

  //Deletes the given event from the calendar (Doesn't save the calendar changes to the server!)
  deleteEvent(event, e){
    if(e){ //If called from a button
      e.preventDefault();
    }
    let events = this.props.calendarForm.events; //Get the list of current events
    if(events.includes(event)){ //If the event exists in the calendar
      events.splice(events.indexOf(event), 1);
      this.props.setCalEvents(events); //Remove it and update the state
      if(this.props.modalType){ //If the modal is still open
        this.onClose(); //Close it
      }
    }
  }

  //Given one event in a recurrence, deletes every event in that same recurrence from the calendar (Doesn't save calendar changes to the server!)
  deleteRecurrence(event, e){
    if(e){
      e.preventDefault();
    }
    let recurrenceId = event.recurrenceId;
    let events = this.props.calendarForm.events;
    let eventsToDelete = [];
    for (let ev1 of events){ //Gather all the events to be deleted
      if(ev1.isInRecurrence){
        if(ev1.recurrenceId === recurrenceId){
          eventsToDelete.push(ev1);
        }
      }
    }
    for (let ev2 of eventsToDelete){ //Removes all the specified events from the calendar
      events.splice(events.indexOf(ev2), 1);
    }
    this.props.setCalEvents(events);
    if(this.props.modalType){
      this.onClose();
    }
  }

  onClose = () => {
    this.props.hideModal();
  }

  render() {
    const editDisabled = (this.props.courseId !== this.props.currentEvent.courseId);
    const deleteRecurDisabled = editDisabled || (!this.props.currentEvent.isInRecurrence);
    let editStyle = modalBtnStyle;
    if(editDisabled){
      editStyle = disabledButtonStyle;
    }
    let delRecurStyle = modalBtnStyle;
    if(deleteRecurDisabled){
      delRecurStyle = disabledButtonStyle;
    }
    const selectedEvent = (
      <div>
        <div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>CourseID: </p>
            <p style={{display: 'inline'}}>{this.props.currentEvent.courseId}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>Start: </p>
            <p style={{display: 'inline'}}>{this.props.currentEvent.start.toLocaleString()}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>End: </p>
            <p style={{display: 'inline'}}>{this.props.currentEvent.end.toLocaleString()}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>Description: </p>
            <p style={{display: 'inline'}}>{this.props.currentEvent.description}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>Location: </p>
            <p style={{display: 'inline'}}>{this.props.currentEvent.location}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>Summary: </p>
            <p style={{display: 'inline'}}>{this.props.currentEvent.summary}</p>
          </div>
        </div>
      </div>
    );

    const buttons = (
      <span>
        <button type='button' style={editStyle} onClick={this.showEditPane.bind(this, this.props.currentEvent)} disabled={editDisabled}>Edit</button>
        <button type='button' style={editStyle} onClick={this.deleteEvent.bind(this, this.props.currentEvent)} disabled={editDisabled}>Delete This Event</button>
        <button type='button' style={delRecurStyle} onClick={this.deleteRecurrence.bind(this, this.props.currentEvent)} disabled={deleteRecurDisabled}>Delete Recurrence</button>
      </span>
    );

    return (
      <ModalWrapper title={this.props.currentEvent.title} body={selectedEvent} footerBtns={buttons} hideModal={this.onClose} closeText="Cancel" closeStyle={modalBtnStyle}/>
    );
  }
}

var modalBtnStyle = {
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

var disabledButtonStyle = {
  display: 'inline',
  margin: '10px 5px 10px 5px',
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "4px",
  paddingBottom: "4px",
  backgroundColor: "grey",
  borderRadius: "4px",
  color: "#00008"
}

const mapStateToProps = state => {
  return {
    currentEvent: state.modal.currentEvent,
    modalType: state.modal.modalType,
    courseId: state.token.lis_course_section_sourcedid,
    calendarForm: state.calendarForm
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal()),
    setCalEvents: (events) => dispatch(setCalEvents(events))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEventModal);
