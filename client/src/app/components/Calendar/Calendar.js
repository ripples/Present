import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {connect} from "react-redux";
import {isEqual, deepCopy, processEvents, generateRandomHexColor} from './CalendarUtils.js';
import {setCalEvents, setCalHexColor, setCalOriginalCal, setCalRoom, setCalURL, setCalCourseId, clearForm, initForm} from '../../Actions/calFormActions.js';
import {showModal, hideModal, showEvent} from '../../Actions/modalActions.js';
import {showMessage, setMessageBody, setMessageTitle} from '../../Actions/messageActions.js';
import {confirm} from '../Messages/Confirm.js';

//Sets the localizer for the BigCalendar component to moment.js
BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  constructor(props){
    super(props);
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

  openModal(modalType) {
    this.props.showModal(modalType);
  }

  //Once changes have been made to the calendar, queries the server to save the new ics file.
  handleSave(e){
    if(e){
      e.preventDefault();
    }
    if(!isEqual(this.props.calendarForm.originalCal, this.props.calendarForm.events)){ //If there have been changes to the calendar
      //Launch confirmation message, asking if user wants to override the currently saved calendar
      confirm('Are you sure you want to override the currently saved calendar file?', {title: "Warning: File Override"}).then(() => {
        this.saveCalendar();
      }, () => {
        console.log('Calendar save aborted.');
      });
    }
    else{ //If there haven't been any changes to the calendar
      this.props.setMessageTitle("ERROR");
      this.props.setMessageBody('ERROR: You haven\'t made any changes to the current calendar.');
      this.props.showMessage('CUSTOM');
    }
  }

  saveCalendar(){ //Make POST request to server to save new ics file.
    var options = {method: 'POST',
                  headers: {"Content-Type": "application/json"},
                  credentials: 'same-origin',
                  body: JSON.stringify(this.props.calendarForm.events)};
    fetch('/api/calendar/save/' + this.props.courseId + '/' + encodeURIComponent("./lectures/" + this.props.calendarForm.room + "/Calendar.ics") + '/' + encodeURIComponent(this.props.calendarForm.url), options).then((response) => {
      return response.text()
    }).then((data) => {
      this.props.setCalOriginalCal(deepCopy(this.props.calendarForm.events)); //So the user can't re-save the same calendar
      this.props.setMessageTitle("Save Successful");
      this.props.setMessageBody(data); //Populate a message modal with the result of the POST request
      this.props.showMessage('CUSTOM'); //Display message to the user
    }).catch((err) => console.log(err));
  }

  //Displays the Room Selection modal if the user clicks the "Change Room" button
  handleRoomChange(e){
    if(!isEqual(this.props.calendarForm.originalCal, this.props.calendarForm.events)){
      confirm('There have been changes made to the calendar, would you like to save your changes before switching rooms?', {title: 'Warning: Unsaved Changes', okLabel: 'Yes', cancelLabel: 'No'}).then(() => {
        this.saveCalendar();
      }, () => {
        console.log('Save declined.');
      }).then(() => {
        this.props.showModal('ROOM_SELECT');
      });
    }
    else{
      this.props.showModal('ROOM_SELECT');
    }
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
    setMessageBody: (body) => dispatch(setMessageBody(body)),
    setMessageTitle: (title) => dispatch(setMessageTitle(title))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
