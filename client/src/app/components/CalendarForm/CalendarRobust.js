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
import {setCalMessageState, setCalMessageText, setCalMessageTitle, setCalEvents, setCalSTime, setCalETime, setCalHexColor,
  setCalSDate, setCalEDate, setCalRepeatDays, setCalRecurrence, setCalExcludeDates, setCalShowRecur, setCalMultidayEvent, setCalOriginalCal,
  setCalIncludeDates, setCalDescription, setCalRoom, setCalURL, setCalCourseId, clearForm} from '../../Actions/calFormActions.js';
import {showModal, hideModal} from '../../Actions/modalActions.js';

BigCalendar.momentLocalizer(moment);

class Event {
  constructor(courseId, title, start, end, description, location, summary, hexColor){
    this.courseId = courseId;
    this.title = title;
    this.start = start;
    this.end = end;
    this.description = description;
    this.location = location;
    this.summary = summary;
    this.hexColor = hexColor;
  }
}

class CalendarRobust extends React.Component {

  constructor(props){
    super(props);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.generateSelectedEvent = this.generateSelectedEvent.bind(this);
    this.generateTitle = this.generateTitle.bind(this);
    this.clear = this.clear.bind(this);
    this.launchMessage = this.launchMessage.bind(this);
    this.eventStyleGetter = this.eventStyleGetter.bind(this);
  }

  componentWillMount(){ //Read any existing calendar file from server, if none exists, blank calendar. (GET)
      this.loadCalendarData();
  }

  loadCalendarData = () => {
    this.props.setCourseId(this.props.courseId);
    fetch(('/api/calendar/populate/' + encodeURIComponent("./lectures/Calendars/" + this.props.calendarForm.room + "/Calendar.ics")), {
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

  componentWillUnmount(){
    this.props.clearForm();
  }

  addNewEvent(event){
    let currentEvents = this.props.calendarForm.events;
    currentEvents.push(event);
    let newEvents = currentEvents;
    this.props.setCalEvents(newEvents);
    if(this.props.modalType){
      this.onCloseModal();
    }
  }

  clear(){
    this.props.setCalShowRecur(false);
    this.props.setCalMultidayEvent(false);
    this.props.setCalSDate('');
    this.props.setCalEDate('');
    this.props.setCalSTime('');
    this.props.setCalETime('');
    this.props.setCalRepeatDays([]);
    this.props.setCalRecurrence([]);
    this.props.setCalExcludeDates([]);
    this.props.setCalIncludeDates([]);
    this.props.setCalDescription('');
  }


  openModal(modalType) {
    this.props.showModal(modalType);
  }

  onOpenMessage = () => {
    this.props.setCalMessageState(true);
  };

  onCloseMessage = () => {
    if(!this.props.calendarForm.modalState){
      this.clear();
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

  generateSelectedEvent(event){
    const editDisabled = (this.props.courseId !== event.courseId);
    let style = modalBtnStyle;
    if(editDisabled){
      style = disabledButtonStyle;
    }
    var selectedEventMessage = (
      <div>
        <div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>CourseID: </p>
            <p style={{display: 'inline'}}>{event.courseId}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>Start: </p>
            <p style={{display: 'inline'}}>{event.start.toLocaleString()}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>End: </p>
            <p style={{display: 'inline'}}>{event.end.toLocaleString()}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>Description: </p>
            <p style={{display: 'inline'}}>{event.description}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>Location: </p>
            <p style={{display: 'inline'}}>{event.location}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <p style={{display: 'inline'}}>Summary: </p>
            <p style={{display: 'inline'}}>{event.summary}</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <button type='button' style={style} onClick={this.showEditPane.bind(this, event)} disabled={editDisabled}>Edit</button>
            <button type='button' style={style} onClick={this.deleteEventBtn.bind(this, event)} disabled={editDisabled}>Delete</button>
            <button type='button' style={modalBtnStyle} onClick={this.onCloseMessage}>Cancel</button>
          </div>
        </div>
      </div>
    );
    this.launchMessage('Event Selected: ' + event.title, selectedEventMessage);
  }

  showEditPane(event, e){
    e.preventDefault();
    const editPane = (
      <div>
        <div>
          <Datetime inputProps={{ placeholder: event.start.toLocaleString(), style: pickerStyle }} onChange={this.handleChange.bind(this, 'sDate')} timeFormat={false} closeOnSelect={true}/>
        </div>
        <div>
          <Datetime inputProps={{ placeholder: event.end.toLocaleString(), style: pickerStyle }} onChange={this.handleChange.bind(this, 'eDate')} timeFormat={false} closeOnSelect={true}/>
        </div>
        <div>
          <TimeRange handleChange={this.handleChange.bind(this)}/>
        </div>
        <div id='description'>
          <input type='text' style={inputStyle} placeholder={event.description} onChange={this.handleChange.bind(this, 'description')}></input>
        </div>
        <div style={{textAlign: 'center'}}>
          <input type='submit' style={modalBtnStyle} value='Save Changes' onClick={this.handleEdit.bind(this, event)}/>
          <button type='button' style={modalBtnStyle} onClick={this.onCloseMessage}>Cancel</button>
        </div>
      </div>
    );
    this.onCloseMessage()
    this.launchMessage('Event Selected: ' + event.title, editPane);
  }




  deleteEvent(event){
    let events = this.props.calendarForm.events;
    if(events.includes(event)){
      events.splice(events.indexOf(event), 1);
      this.props.setCalEvents(events);
      if(this.props.calendarForm.messageState){
        this.onCloseMessage();
      }
    }
  }

  deleteEventBtn(event, e){
    e.preventDefault();
    this.deleteEvent(event);
  }


  handleEdit(event, e){
    e.preventDefault();
    let editedEvent = new Event(this.props.courseId, event.title, getEventDT(this.props.calendarForm.sDate, this.props.calendarForm.sTime),
                                getEventDT(this.props.calendarForm.eDate, this.props.calendarForm.eTime), this.props.calendarForm.description,
                                this.props.calendarForm.room, (getCurrentSemester() + ' ' + this.props.courseId), event.hexColor);
    this.deleteEvent(event);
    this.addNewEvent(editedEvent);
    this.onCloseMessage();
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
            onSelectEvent={event => this.generateSelectedEvent(event)}
            onSelectSlot={(slotInfo) => this.launchMessage('Empty Slot Selected', 'There are no events scheduled in this time slot')}
            eventPropGetter={(event => this.eventStyleGetter(event))}
          />
        </div>
        <div className="row">
          <button type='button' style={modalBtnStyle} onClick={this.openModal.bind(this, 'ADD_EVENT')}>Add Event(s)</button>
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
    modalType: state.modalType,
    calendarForm: state.calendarForm,
    courseId: state.token.lis_course_section_sourcedid,
    courseTitle: state.token.context_title
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {

	return {
    clearForm: () => dispatch(clearForm()),
    setCourseId: (id) => dispatch(setCalCourseId(id)),
    setCalRepeatDays: (days) => dispatch(setCalRepeatDays(days)),
    setCalRecurrence: (recurrence) => dispatch(setCalRecurrence(recurrence)),
    setCalExcludeDates: (dates) => dispatch(setCalExcludeDates(dates)),
    setCalIncludeDates: (dates) => dispatch(setCalIncludeDates(dates)),
    setCalSDate: (date) => dispatch(setCalSDate(date)),
    setCalEDate: (date) => dispatch(setCalEDate(date)),
    setCalDescription: (desc) => dispatch(setCalDescription(desc)),
    setCalEvents: (events) => dispatch(setCalEvents(events)),
    setCalMessageState: (messageState) => dispatch(setCalMessageState(messageState)),
    setCalMessageText: (messageText) => dispatch(setCalMessageText(messageText)),
    setCalMessageTitle: (messageTitle) => dispatch(setCalMessageTitle(messageTitle)),
    setCalShowRecur: (showRecur) => dispatch(setCalShowRecur(showRecur)),
    setCalOriginalCal: (originalCal) => dispatch(setCalOriginalCal(originalCal)),
    setCalSTime: (sTime) => dispatch(setCalSTime(sTime)),
    setCalETime: (eTime) => dispatch(setCalETime(eTime)),
    setCalMultidayEvent: (multidayEvent) => dispatch(setCalMultidayEvent(multidayEvent)),
    setCalHexColor: (hexColor) => dispatch(setCalHexColor(hexColor)),
    setCalRoom: (room) => dispatch(setCalRoom(room)),
    setCalURL: (url) => dispatch(setCalURL(url)),
    showModal: (modalType) => dispatch(showModal(modalType)),
    hideModal: () => dispatch(hideModal())
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarRobust);
