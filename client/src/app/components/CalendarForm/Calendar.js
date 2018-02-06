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
import {setCalMessageState, setCalMessageText, setCalMessageTitle, setCalEvents, setCalHexColor, setCalOriginalCal, setCalRoom, setCalURL, setCalCourseId, clearForm, initForm} from '../../Actions/calFormActions.js';
import {showModal, hideModal, showEvent} from '../../Actions/modalActions.js';

BigCalendar.momentLocalizer(moment);

class Calendar extends React.Component {
  constructor(props){
    super(props);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.generateTitle = this.generateTitle.bind(this);
    this.launchMessage = this.launchMessage.bind(this);
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
  }

  componentWillMount(){ //Read any existing calendar file from server, if none exists, blank calendar. (GET)
      this.loadCalendarData();
  }

  componentWillUnmount(){
    this.props.clearForm();
  }

  loadCalendarData = () => {
    this.props.setCourseId(this.props.courseId);
    fetch(('/api/calendar/populate/' + encodeURIComponent("./lectures/" + this.props.calendarForm.room + "/Calendar.ics")), {
      credentials: 'same-origin' // or 'include'
    }).then(
      res => (res.status === 200 || res.status === 204 || res.status === 304) ? res.json() : []
    ).then((json) => {
      if(json.length !== 0){ //If there was no valid calendar file
        const calendar = processEvents(json);
        this.props.setCalOriginalCal(calendar);
        this.props.setCalEvents(deepCopy(calendar));
        this.props.setCalHexColor(calendar[0].hexColor);
      }
      else{
        this.props.setCalOriginalCal([]);
        this.props.setCalEvents([]);
        this.props.setCalHexColor(generateRandomHexColor());
      }
    }).catch((err) => console.log(err));
  };

  addNewEvent(event){
    let currentEvents = this.props.calendarForm.events;
    currentEvents.push(event);
    let newEvents = currentEvents;
    this.props.setCalEvents(newEvents);
    if(this.props.modalType){
      this.onCloseModal();
    }
  }

  openModal(modalType) {
    this.props.showModal(modalType);
  }

  onOpenMessage = () => {
    this.props.setCalMessageState(true);
  };

  onCloseMessage = () => {
    if(!this.props.calendarForm.modalState){
      this.props.clearForm();
    }
    this.props.setCalMessageTitle('');
    this.props.setCalMessageText('');
    this.props.setCalMessageState(false);
  };

  launchMessage(title, text){
    this.props.setCalMessageTitle(this.generateTitle(title));
    this.props.setCalMessageText(text);
    this.onOpenMessage();
  }

  launchMessageBtn(title, text, e){
    e.preventDefault();
    this.launchMessage(title, text);
  }

  generateTitle(text){
    const title = (
      <h1 style={legendStyle}>{text}</h1>
    );
    return title;
  }

  deleteEvent(event, e){
    if(e){
      e.preventDefault();
    }
    let events = this.props.calendarForm.events;
    if(events.includes(event)){
      events.splice(events.indexOf(event), 1);
      this.props.setCalEvents(events);
      if(this.props.calendarForm.messageState){
        this.onCloseMessage();
      }
    }
  }

  handleSave(e){
    e.preventDefault();
    if(!isEqual(this.props.calendarForm.originalCal, this.props.calendarForm.events)){
      var options = {method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    credentials: 'same-origin',
                    body: JSON.stringify(this.props.calendarForm.events)};

      fetch('/api/calendar/save/' + this.props.courseId + '/' + encodeURIComponent("./lectures/" + this.props.calendarForm.room + "/Calendar.ics") + '/' + encodeURIComponent(this.props.calendarForm.url), options).then((response) => {
        return response.text()
      }).then((data) => {
        this.props.setCalOriginalCal(deepCopy(this.props.calendarForm.events)); //So user can't re-save the same calendar
        this.launchMessage('Calendar saved successfully!', data);

      }).catch((err) => console.log(err));
    }
    else{
      this.launchMessage('ERROR: No Changes Made', 'You haven\'t made any changes to the current calendar.');
    }
  }

  handleRoomChange(e){
    this.props.showModal('ROOM_SELECT');
  }

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
    var currentRoom = JSON.parse(JSON.stringify(this.props.calendarForm.room));

    return (
      <div className="col-md-12">
        <div className="row">
          <label name="currentRoom" style={roomLblStyle}>Currently Selected Room: {this.props.calendarForm.room}</label>
          <label name='numEvents' style={eventsScheduledStyle}>Events Scheduled: {this.props.calendarForm.events.length}</label>
          <Modal open={this.props.calendarForm.messageState} onClose={this.onCloseMessage} showCloseIcon={false} little>
            {this.props.calendarForm.messageTitle}
            {this.props.calendarForm.messageText}
          </Modal>
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
            onSelectSlot={(slotInfo) => this.launchMessage('Empty Slot Selected', 'There are no events scheduled in this time slot')}
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
    setCalMessageState: (messageState) => dispatch(setCalMessageState(messageState)),
    setCalMessageText: (messageText) => dispatch(setCalMessageText(messageText)),
    setCalMessageTitle: (messageTitle) => dispatch(setCalMessageTitle(messageTitle)),
    setCalOriginalCal: (originalCal) => dispatch(setCalOriginalCal(originalCal)),
    setCalHexColor: (hexColor) => dispatch(setCalHexColor(hexColor)),
    setCalRoom: (room) => dispatch(setCalRoom(room)),
    setCalURL: (url) => dispatch(setCalURL(url)),
    showModal: (modalType) => dispatch(showModal(modalType)),
    hideModal: () => dispatch(hideModal()),
    showEvent: (currentEvent) => dispatch(showEvent(currentEvent)),
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
