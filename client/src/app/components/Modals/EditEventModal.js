import React from 'react';
import TimeRange from '../CalendarForm/TimeRange.js';
import Datetime from 'react-datetime';
import {connect} from 'react-redux';
import 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import Event from '../../utils/Event.js';
import ModalWrapper from './ModalWrapper.js';
import {getCurrentSemester, formatTime, getEventDT, isValidDate} from '../CalendarForm/CalendarUtils.js';
import {hideModal} from '../../Actions/modalActions.js';
import {clearForm, setCalRepeatDays, setCalRecurrence, setCalExcludeDates, setCalIncludeDates, setCalSDate,
        setCalEDate, setCalDescription, setCalEvents, setCalShowRecur, setCalSTime, setCalETime, setCalMultidayEvent} from '../../Actions/calFormActions.js';
import {showMessage, setMessageBody} from '../../Actions/messageActions.js';
import {confirm} from '../Messages/Confirm.js';


class EditEventModal extends React.Component {
  constructor(props){
    super(props);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  //Updates the appropriate field of calendarForm's state with the given value
  handleChange(name, e){
    switch(name){
      case 'sDate':
        if(moment.isMoment(e)){
          this.props.setCalSDate(e.toDate());
          return;
        }
        else if(isValidDate(e)){
          let m = moment(e, "MDY");
          this.props.setCalSDate(m.toDate());
          return;
        }
        else{
          return;
        }
      case 'eDate':
        if(moment.isMoment(e)){
          this.props.setCalEDate(e.toDate());
          return;
        }
        else if(isValidDate(e)){
          let m = moment(e, "MDY");
          this.props.setCalEDate(m.toDate());
          return;
        }
        else{
          return;
        }
      case 'sTime':
        this.props.setCalSTime(formatTime(e.target.value));
        return;
      case 'eTime':
        this.props.setCalETime(formatTime(e.target.value));
        return;
      case 'description':
        this.props.setCalDescription(e.target.value);
        return;
      case 'showRecur':
        if(this.props.calendarForm.showRecur){
          this.props.setCalShowRecur(false);
        }
        else{
          if(this.props.calendarForm.multidayEvent){
            this.props.setCalMultidayEvent(false);
            this.refs['mdchkbx'].checked = !this.refs['mdchkbx'].checked;
          }
          this.props.setCalShowRecur(true);
        }
        return;
      case 'multidayEvent':
        if(this.props.calendarForm.multidayEvent){
          this.props.setCalMultidayEvent(false);
        }
        else{
          this.props.setCalMultidayEvent(true);
        }
        return;
      default:
        console.log("error", name);
        return;
    }
  }

  //Deletes the given event from the calendar (Doesn't save the calendar changes to the server!)
  deleteEvent(event, e){
    confirm('Are you sure you want to delete this event? To make the changes permanent, you must save the calendar.', {title: 'Warning: Event Deletion'}).then(() => {
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
    }, () => {
      console.log('Single event deletion aborted.');
    });
  }

  //Adds a new event to the calendar list (doesn't save the calendar changes to the server!)
  eventDoesConflict(event){
    let currentEvents = this.props.calendarForm.events;
    for(let e of currentEvents){
      if(((event.start >= e.start) && (event.start <= e.end)) || ((event.end >= e.start) && (event.end <= e.end))){
        return true;
      }
    }
    return false;
  }

  //Adds a new event to the calendar list (doesn't save the calendar changes to the server!)
  addNewEvent(event){
    let currentEvents = this.props.calendarForm.events; //Get the current list of events
    if(this.eventDoesConflict(event)){
      this.props.setMessageTitle("ERROR");
      this.props.setMessageBody("Error (Overlapping Event): You cannot have any events overlapping each other. Please change the timeframe for this event.");
      this.props.showMessage('CUSTOM');
      return;
    }
    currentEvents.push(event); //Push the new event
    this.props.setCalEvents(currentEvents); //Update the state
    this.onClose();
  }

  onClose = () => {
    this.props.clearForm();
    this.props.hideModal();
  }

  //Makes changes to the given event as specified by the user
  handleEdit(event, e){
    if(e){ //If called from a button
      e.preventDefault();
    }
    //Create the new edited event with the new specifications by the user
    let editedEvent = new Event(this.props.courseId, event.title, getEventDT(this.props.calendarForm.sDate, this.props.calendarForm.sTime),
                                getEventDT(this.props.calendarForm.eDate, this.props.calendarForm.eTime), this.props.calendarForm.description,
                                this.props.calendarForm.room, (getCurrentSemester() + ' ' + this.props.courseId), event.hexColor);
    this.deleteEvent(event); //Remove the old event
    this.addNewEvent(editedEvent); //Add the new one
    this.onClose(); //Close the modal
  }

  render() {
    const editPane = (
      <div>
        <div>
          <Datetime inputProps={{ placeholder: this.props.currentEvent.start.toLocaleString(), style: pickerStyle }} onChange={this.handleChange.bind(this, 'sDate')} timeFormat={false} closeOnSelect={true}/>
        </div>
        <div>
          <Datetime inputProps={{ placeholder: this.props.currentEvent.end.toLocaleString(), style: pickerStyle }} onChange={this.handleChange.bind(this, 'eDate')} timeFormat={false} closeOnSelect={true}/>
        </div>
        <div>
          <TimeRange handleChange={this.handleChange.bind(this)}/>
        </div>
        <div id='description'>
          <input type='text' style={inputStyle} placeholder={this.props.currentEvent.description} onChange={this.handleChange.bind(this, 'description')}></input>
        </div>
      </div>
    );

    const buttons = (
      <span>
        <button type='button' style={modalBtnStyle} onClick={this.handleEdit.bind(this, this.props.currentEvent)}>Save Changes</button>
      </span>
    );

    return (
      <ModalWrapper title="Edit Event(s)" body={editPane} footerBtns={buttons} hideModal={this.onClose} closeText="Cancel" closeStyle={modalBtnStyle}/>
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

/*var disabledButtonStyle = {
  display: 'inline',
  margin: '10px 5px 10px 5px',
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "4px",
  paddingBottom: "4px",
  backgroundColor: "grey",
  borderRadius: "4px",
  color: "#00008"
}*/

var pickerStyle = {
  display: 'inline-block',
  margin: 'auto',
  marginTop: '10px',
  marginBottom: '10px'
}

var inputStyle = {
  width: '300px',
  margin: '10px 5px 10px 5px'
}

const mapStateToProps = state => {
  return {
    currentEvent: state.modal.currentEvent,
    courseId: state.token.lis_course_section_sourcedid,
    calendarForm: state.calendarForm
  };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    hideModal: () => dispatch(hideModal()),
    clearForm: () => dispatch(clearForm()),
    setCalRepeatDays: (days) => dispatch(setCalRepeatDays(days)),
    setCalRecurrence: (recurrence) => dispatch(setCalRecurrence(recurrence)),
    setCalExcludeDates: (dates) => dispatch(setCalExcludeDates(dates)),
    setCalIncludeDates: (dates) => dispatch(setCalIncludeDates(dates)),
    setCalSDate: (date) => dispatch(setCalSDate(date)),
    setCalEDate: (date) => dispatch(setCalEDate(date)),
    setCalDescription: (desc) => dispatch(setCalDescription(desc)),
    setCalEvents: (events) => dispatch(setCalEvents(events)),
    setCalShowRecur: (showRecur) => dispatch(setCalShowRecur(showRecur)),
    setCalSTime: (sTime) => dispatch(setCalSTime(sTime)),
    setCalETime: (eTime) => dispatch(setCalETime(eTime)),
    setCalMultidayEvent: (multidayEvent) => dispatch(setCalMultidayEvent(multidayEvent)),
    showMessage: (messageType) => dispatch(showMessage(messageType)),
    setMessageBody: (body) => dispatch(setMessageBody(body))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EditEventModal);
