import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-responsive-modal';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {connect} from "react-redux";
import TimeRange from './TimeRange.js';
import {getCurrentSemester, isEqual, getEventDT, deepCopy, processEvents, generateRandomHexColor} from './CalendarUtils.js';
import {setCalEvents, setCalHexColor, setCalOriginalCal, setCalRoom, setCalURL, setCalCourseId, clearForm, initForm} from '../../Actions/calFormActions.js';
import {showModal, hideModal, showEvent} from '../../Actions/modalActions.js';
import {showMessage, setMessageBody} from '../../Actions/messageActions.js';

//Sets the localizer for the BigCalendar component to moment.js
BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
  }

  //On component mounting to DOM, load in the calendar data to populate gui. (Returns either valid calendar or blank calendar from GET request)
  componentWillMount(){
      this.loadCalendarData();
  }

  componentWillUnmount(){
    this.props.clearForm();
  }

  loadCalendarData = () => { //Queries the server for the desired ics file, if one exists.
    this.props.setCourseId(this.props.courseId);
    fetch(('/api/calendar/populate/' + encodeURIComponent("./lectures/" + this.props.calendarForm.room + "/Calendar.ics")), { //fetch the ics file assigned to the room the user selected
      credentials: 'same-origin' // or 'include'
    }).then(
      res => (res.status === 200 || res.status === 204 || res.status === 304) ? res.json() : []
    ).then((json) => {
      if(json.length !== 0){ //If there was a valid ics file
        const calendar = processEvents(json); //This populates the calendar with the events in the ics file.
        this.props.setCalOriginalCal(calendar);
        this.props.setCalEvents(deepCopy(calendar));
        this.props.setCalHexColor(calendar[0].hexColor);
      }
      else{ //If there was no valid ics file
        this.props.setCalOriginalCal([]); //This sets up a blank calendar for the given room.
        this.props.setCalEvents([]);
        this.props.setCalHexColor(generateRandomHexColor()); //Assigns random hex color to new class.
      }
    }).catch((err) => console.log(err));
  };

  //Add the given event to the current calendar (does not save changes to the server!)
  addNewEvent(event){
    let currentEvents = this.props.calendarForm.events; //Get the current state of the events on the calendar
    currentEvents.push(event); //Push the new event into the group
    let newEvents = currentEvents; //Create new array containing all new events
    this.props.setCalEvents(newEvents); //Set the current displayed calendar to the new events
    if(this.props.modalType){ //If modal is open
      this.onCloseModal(); //Close it
    }
  }

  openModal(modalType) {
    this.props.showModal(modalType);
  }

  //Deletes the given event from the calendar gui (doesn't save the calendar changes to the server!)
  deleteEvent(event, e){
    if(e){ //If a button triggered this
      e.preventDefault();
    }
    let events = this.props.calendarForm.events; //Get the current events
    if(events.includes(event)){ //If the event we want to delete exists in the calendar
      events.splice(events.indexOf(event), 1); //Remove it
      this.props.setCalEvents(events); //Set calendar to new array without the deleted event
    }
  }

  //Once changes have been made to the calendar, queries the server to save the new ics file.
  handleSave(e){
    e.preventDefault();
    if(!isEqual(this.props.calendarForm.originalCal, this.props.calendarForm.events)){ //If there have been changes to the calendar
      var options = {method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    credentials: 'same-origin',
                    body: JSON.stringify(this.props.calendarForm.events)};
      //TODO(Jon):
      //Launch confirmation modal for save ("Are you sure you want to override previous calendar?")
      //.then() the below code on affirmative close, else, return

      //Make POST request to server
      fetch('/api/calendar/save/' + this.props.courseId + '/' + encodeURIComponent("./lectures/" + this.props.calendarForm.room + "/Calendar.ics") + '/' + encodeURIComponent(this.props.calendarForm.url), options).then((response) => {
        return response.text()
      }).then((data) => {
        this.props.setCalOriginalCal(deepCopy(this.props.calendarForm.events)); //So the user can't re-save the same calendar
        this.props.setMessageBody(data); //Populate a message modal with the result of the POST request
        this.props.showMessage('CUSTOM'); //Display message to the user
      }).catch((err) => console.log(err));
    }
    else{ //If there haven't been any changes to the calendar
      this.props.setMessageBody('ERROR: You haven\'t made any changes to the current calendar.');
      this.props.showMessage('CUSTOM');
    }
  }

  //Displays the Room Selection modal if the user clicks the "Change Room" button
  handleRoomChange(e){
    this.props.showModal('ROOM_SELECT');
  }

  //Gets the style of each event on the calendar
  eventStyleGetter(event){
    var backgroundColor = event.hexColor;
    var style = {
      backgroundColor: backgroundColor,
      opacity: 0.8,
      fontWeight: 600, //Slightly less than bold.
      color: 'white',
      textShadow: '-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black' //Bc webkit-text-stroke is not supported on major browsers yet
    };
    return {
      style: style
    };
  }

  render() {

    return (
      <div className="col-md-12">
        <div className="row">
          <label name="currentRoom" style={roomLblStyle}>Currently Selected Room: {this.props.calendarForm.room}</label>
          <label name='numEvents' style={eventsScheduledStyle}>Events Scheduled: {this.props.calendarForm.events.length}</label>
        </div>
        <div className="row" style={divStyle}>
          <BigCalendar
            selectable
            popup
            events={this.props.calendarForm.events}
            defaultView='month'
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={event => this.props.showEvent(event)}
            eventPropGetter={(event => this.eventStyleGetter(event))}
          />
        </div>
        <div className="row">
          <button type='button' style={modalBtnStyle} onClick={this.openModal.bind(this, 'ADD_EVENT')}>Add Event(s)</button>
          <button type='button' style={modalBtnStyle} onClick={this.handleRoomChange.bind(this)}>Change Room</button>
          <button type='button' style={modalBtnStyle} onClick={this.handleSave.bind(this)}>Save Calendar</button>
        </div>
      </div>
    );
  }

}

var roomLblStyle = {
  textAlign: 'left',
  float: 'left',
  display: 'inline',
  margin: '0px 0px 0px 15px'
}

var eventsScheduledStyle = {
  textAlign: 'right',
  float: 'right',
  display: 'inline',
  margin: '0px 15px 0px 0px'
}

var divStyle = {
  height: "500px",
  width: 'auto',
  margin: 'auto'
}

var legendStyle = {
  background: "#000080",
  padding: "6px",
  fontWeight: "bold",
  color: "white",
  textAlign: 'center'
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

const mapStateToProps = state => {

	return {
    modalType: state.modalType,
    calendarForm: state.calendarForm,
    courseId: state.token.lis_course_section_sourcedid,
    courseTitle: state.token.context_title,
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
    initForm: () => dispatch(initForm()),
    clearForm: () => dispatch(clearForm()),
    setCourseId: (id) => dispatch(setCalCourseId(id)),
    setCalEvents: (events) => dispatch(setCalEvents(events)),
    setCalOriginalCal: (originalCal) => dispatch(setCalOriginalCal(originalCal)),
    setCalHexColor: (hexColor) => dispatch(setCalHexColor(hexColor)),
    setCalRoom: (room) => dispatch(setCalRoom(room)),
    setCalURL: (url) => dispatch(setCalURL(url)),
    showModal: (modalType) => dispatch(showModal(modalType)),
    hideModal: () => dispatch(hideModal()),
    showEvent: (currentEvent) => dispatch(showEvent(currentEvent)),
    showMessage: (messageType) => dispatch(showMessage(messageType)),
    setMessageBody: (body) => dispatch(setMessageBody(body))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
