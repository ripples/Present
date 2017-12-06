import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Modal from 'react-responsive-modal';
import Datetime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';
import {connect} from "react-redux";
import TimeRange from './TimeRange.js';
import {getCurrentSemester, formatDate, revertDate, isEqual, formatTime, getEventDT, deepCopy, processEvents, isValidDate} from './CalendarUtils.js';
import {setCalModalState, setCalMessageState, setCalMessageText, setCalMessageTitle, setCalEvents, setCalSTime, setCalETime,
  setCalSDate, setCalEDate, setCalRepeatDays, setCalRecurrence, setCalExcludeDates, setCalShowRecur, setCalOriginalCal,
  setCalIncludeDates, setCalDescription, setCalLoc, setCalCourseId, clearForm} from '../../Actions/calFormActions.js';

BigCalendar.momentLocalizer(moment);

class Event {
  constructor(courseId, title, start, end, description, location, summary){
    this.courseId = courseId;
    this.title = title;
    this.start = start;
    this.end = end;
    this.description = description;
    this.location = location;
    this.summary = summary;
  }
}

class CalendarRobust extends React.Component {

  constructor(props){
    super(props);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.deleteEvent = this.deleteEvent.bind(this);
    this.addRecurringEvent = this.addRecurringEvent.bind(this);
    this.generateSelectedEvent = this.generateSelectedEvent.bind(this);
    this.generateTitle = this.generateTitle.bind(this);
    this.clear = this.clear.bind(this);
    this.launchMessage = this.launchMessage.bind(this);
  }

  componentWillMount(){ //Read any existing calendar file from server, if none exists, blank calendar. (GET)
    this.props.setCourseId(this.props.courseId);
    fetch(('/api/calendar/'), {
      credentials: 'same-origin' // or 'include'
    }).then(
      res => (res.status === 200 || res.status === 204) ? res.json() : []
    ).then((json) => {
      const calendar = processEvents(json);
      this.props.setCalOriginalCal(calendar);
      this.props.setCalEvents(processEvents(deepCopy(calendar)));
    }).catch((err) => console.log(err));
  }

  componentWillUnmount(){
    this.props.clearForm();
  }

  clear(){
    this.props.setCalShowRecur(false);
    this.props.setCalSDate('');
    this.props.setCalEDate('');
    this.props.setCalSTime('');
    this.props.setCalETime('');
    this.props.setCalRepeatDays([]);
    this.props.setCalRecurrence([]);
    this.props.setCalExcludeDates([]);
    this.props.setCalIncludeDates([]);
    this.props.setCalDescription('');
    this.props.setCalLoc('');
  }

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
      case 'location':
        this.props.setCalLoc(e.target.value);
        return;
      case 'showRecur':
        if(this.props.calendarForm.showRecur){
          this.props.setCalShowRecur(false);
        }
        else{
          this.props.setCalShowRecur(true);
        }
        return;
      default:
        console.log("error", name);
        return;
    }
  }

  handleCheckboxChange(e){
    const rDays = this.props.calendarForm.repeatDays;
    let index
    if(e.target.checked) {rDays.push(e.target.name);}
    else {
      index = rDays.indexOf(e.target.name);
      rDays.splice(index, 1);
    }
    this.props.setCalRepeatDays(rDays);
  }

  onOpenModal = () => {
    this.props.setCalModalState(true);
  };

  onCloseModal = () => {
    this.clear();
    this.props.setCalModalState(false);
  };

  onOpenMessage = () => {
    this.props.setCalMessageState(true);
  };

  onCloseMessage = () => {
    this.clear();
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
            <button type='button' style={modalBtnStyle} onClick={this.showEditPane.bind(this, event)}>Edit</button>
            <button type='button' style={modalBtnStyle} onClick={this.deleteEventBtn.bind(this, event)}>Delete</button>
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
        <div id='description/location'>
          <input type='text' style={inputStyle} placeholder={event.description} onChange={this.handleChange.bind(this, 'description')}></input>
          <input type='text' style={inputStyle} placeholder={event.location} onChange={this.handleChange.bind(this, 'location')}></input>
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

  handleAddDate(type, e){
    var m = false;
    if(!moment.isMoment(e) && isValidDate(e)){
      m = moment(e, "MDY")
    }
    else if(moment.isMoment(e)){
      m = e;
    }
    else{
      if(!m){
        return;
      }
      else{
        if(m.format("YYYYMMDD").toString() !== moment().format("YYYYMMDD").toString()){
          if(type === 'exclude'){
            const currentExcludes = this.props.calendarForm.excludeDates;
            let newDate = formatDate(m.format("YYYY-MM-DD").toString());
            if(!currentExcludes.includes(newDate)){
              const newExcludes = currentExcludes.concat(newDate);
              this.props.setCalExcludeDates(newExcludes);
            }
          }
          else if(type === 'include'){
            const currentIncludes = this.props.calendarForm.includeDates;
            let newDate = formatDate(m.format("YYYY-MM-DD").toString());
            if(!currentIncludes.includes(newDate)){
              const newIncludes = currentIncludes.concat(newDate);
              this.props.setCalIncludeDates(newIncludes);
            }
          }
        }
      }
    }
  }

  undoAddDate(type, e){
    e.preventDefault();
    if(type === 'exclude'){
      let newExcludes = this.props.calendarForm.excludeDates;
      if(newExcludes.length !== 0){
        newExcludes.pop();
        this.props.setCalExcludeDates(newExcludes);
      }
    }
    else if(type === 'include'){
      let newIncludes = this.props.calendarForm.includeDates;
      if(newIncludes.length !== 0){
        newIncludes.pop();
        this.props.setCalIncludeDates(newIncludes);
      }
    }
  }

  addNewEvent(event){
    let currentEvents = this.props.calendarForm.events;
    currentEvents.push(event);
    let newEvents = currentEvents;
    this.props.setCalEvents(newEvents);
    if(this.props.calendarForm.modalState){
      this.onCloseModal();
    }
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

  addRecurringEvent(){
    let start = this.props.calendarForm.sDate;
    let end = this.props.calendarForm.eDate;
    let repeatDays = this.props.calendarForm.repeatDays;
    let includes = this.props.calendarForm.includeDates;
    if(includes.length === 0){includes = -1} //Important for checking on server, do not change unless in both places.
    let excludes = this.props.calendarForm.excludeDates;
    if(excludes.length === 0){excludes = -1} //Important for checking on server, do not change unless in both places.
    fetch(('/api/calendar/' + repeatDays + '/' + start + '/' + end + '/' + includes + '/' + excludes), {
      credentials: 'same-origin' // or 'include'
    }).then(res => (res.status === 200 || res.status === 204 || res.status === 304) ? res.json() : []
    ).then((json) => {
    this.props.setCalRecurrence(json);
    let recurrence = this.props.calendarForm.recurrence;
    let currentEvents = this.props.calendarForm.events;
    for (let date of recurrence){
      let sDate = new Date(parseInt(date.substring(0, 4), 10), parseInt(date.substring(4, 6), 10)-1,
                           parseInt(date.substring(6,8), 10), this.props.calendarForm.sDate.getHours(), this.props.calendarForm.sDate.getMinutes());
      let eDate = new Date(parseInt(date.substring(0, 4), 10), parseInt(date.substring(4, 6), 10)-1,
                           parseInt(date.substring(6,8), 10), this.props.calendarForm.eDate.getHours(), this.props.calendarForm.eDate.getMinutes());
      let newEvent = new Event(this.props.courseId, (this.props.courseTitle + ' ' + getCurrentSemester()), getEventDT(sDate, this.props.calendarForm.sTime),
                              getEventDT(eDate, this.props.calendarForm.eTime), this.props.calendarForm.description, this.props.calendarForm.location,
                              (getCurrentSemester() + ' ' + this.props.courseId));
      currentEvents.push(newEvent);
    }
    let newEvents = currentEvents;
    this.props.setCalEvents(newEvents);
    this.onCloseModal();
    }).catch((err) => console.log(err));
  }

  handleEdit(event, e){
    e.preventDefault();
    let editedEvent = new Event(this.props.courseId, event.title, getEventDT(this.props.calendarForm.sDate, this.props.calendarForm.sTime),
                                getEventDT(this.props.calendarForm.eDate, this.props.calendarForm.eTime), this.props.calendarForm.description,
                                this.props.calendarForm.location, (getCurrentSemester() + ' ' + this.props.courseId));
    this.deleteEvent(event);
    this.addNewEvent(editedEvent);
    this.onCloseMessage();
  }

  handleSubmit(e){
    e.preventDefault();
    let start = this.props.calendarForm.sDate;
    let end = this.props.calendarForm.eDate;
    let repeatDays = this.props.calendarForm.repeatDays;
    if(+start > +end){
      this.launchMessage('ERROR: Start Date later than End Date', 'Your ending date must be later than or the same as your starting date.');
    }
    else if(repeatDays.length === 0){
      let newEvent = new Event(this.props.courseId, (this.props.courseTitle + ' ' + getCurrentSemester()), getEventDT(this.props.calendarForm.sDate, this.props.calendarForm.sTime),
                               getEventDT(this.props.calendarForm.eDate, this.props.calendarForm.eTime), this.props.calendarForm.description, this.props.calendarForm.location,
                               (getCurrentSemester() + ' ' + this.props.courseId));
      this.addNewEvent(newEvent); //Add a single event
    }
    else {
      if(+start === +end && repeatDays.length !== 0){ //If the user input a recurrence but set the same start and end date
        this.launchMessage('ERROR: Single Day Recurrence', 'If you want a recurring date, you must have the start and end dates be different.');
      }
      else {
        this.addRecurringEvent(); //Add a recurring event
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

      fetch('/api/calendar/' + this.props.courseId, options).then((response) => {
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

  testBtn(e) {
    e.preventDefault();

    fetch(('/api/calendar/test/'), {
      credentials: 'same-origin' // or 'include'
    }).then(
      res => (res.status === 200 || res.status === 204 || res.status === 304) ? res.text() : []
    ).then((data) => {
      console.log(data);
    }).catch((err) => console.log(err));
  }

  render() {

    const helpMessage = (
      <div>
        <div>
          <p>To add a single event:</p>
          <ul>
            <li>Select a starting and ending date (You can have an event span multiple days)</li>
            <li>Type in a start and end time for your event, and specify AM or PM</li>
            <li>Provide a description and location for your event</li>
            <li>Click "Add Event"</li>
          </ul>
        </div>
        <div>
          <p>To add a recurring event:</p>
          <ul>
            <li>Click the checkbox in the upper left corner that says "Create Recurring Event?" to bring up the recurrence options</li>
            <li>Select the date you wish the recurring event to start on</li>
            <li>Select the date you wish the recurrence to end on (inclusive of selected date)</li>
            <li>Type in a start and end time, which will be applied to every event in the reccurence</li>
            <li>Click the checkboxes for the days of the week you wish the event to repeat on</li>
            <li>If you want, you may select individual dates to exclude and/or include from the repeating event range of dates, if you make a mistake you can press the undo button to remove your last added date</li>
            <li>Provide a description and location for the recurring event</li>
            <li>Click "Add Event"</li>
          </ul>
        </div>
      </div>
    );

    const addEventForm = (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset style={fieldsetStyle}>
          <legend style={legendStyle}>Add New Event(s)</legend>
          <div>
            <label style={labelStyle} htmlFor='showRecur'><input style={chkbxStyle} type='checkbox' name='showRecur' onChange={this.handleChange.bind(this, 'showRecur')}/>Create Recurring Event?</label>
          </div>
          <div>
            <Datetime inputProps={{ placeholder: 'Start Date: MM/DD/YYYY', style: pickerStyle }} onChange={this.handleChange.bind(this, 'sDate')} timeFormat={false} closeOnSelect={true}/>
          </div>
          <div>
            <Datetime inputProps={{ placeholder: 'End Date: MM/DD/YYYY', style: pickerStyle }} onChange={this.handleChange.bind(this, 'eDate')} timeFormat={false} closeOnSelect={true}/>
          </div>
          <div>
            <TimeRange handleChange={this.handleChange.bind(this)}/>
          </div>
          <div name='recurringEventDiv' hidden={!this.props.calendarForm.showRecur}>
            <div>
              <label style={labelStyle}>Repeat? (WEEKLY): </label>
              <label style={labelStyle} htmlFor='Monday'><input style={chkbxStyle} type='checkbox' name='Monday' onChange={this.handleCheckboxChange.bind(this)}/>Monday</label>
              <label style={labelStyle} htmlFor='Tuesday'><input style={chkbxStyle} type='checkbox' name='Tuesday' onChange={this.handleCheckboxChange.bind(this)}/>Tuesday</label>
              <label style={labelStyle} htmlFor='Wednesday'><input style={chkbxStyle} type='checkbox' name='Wednesday' onChange={this.handleCheckboxChange.bind(this)}/>Wednesday</label>
              <label style={labelStyle} htmlFor='Thursday'><input style={chkbxStyle} type='checkbox' name='Thursday' onChange={this.handleCheckboxChange.bind(this)}/>Thursday</label>
              <label style={labelStyle} htmlFor='Friday'><input style={chkbxStyle} type='checkbox' name='Friday' onChange={this.handleCheckboxChange.bind(this)}/>Friday</label>
            </div>
            <div id='exclude/include'>
              <div id='exclude'>
                <Datetime inputProps={{ placeholder: 'Exclude A Date', style: pickerStyle }} onChange={this.handleAddDate.bind(this, 'exclude')} timeFormat={false} closeOnSelect={true}/>
                <button type='button' style={undoStyle} onClick={this.undoAddDate.bind(this, 'exclude')}>Undo Exclude</button>
                <label name='excludeDates'>Currently Excluded: [{this.props.calendarForm.excludeDates.map((date, i) => {
                  var newDate = "";
                  if(i === 0){
                    newDate = revertDate(date);
                  }
                  else{
                    newDate = ", " + revertDate(date);
                  }
                  return (<p key={i} style={dateStyle}>{newDate}</p>)})}]
                </label>
              </div>
              <div id='include'>
                <Datetime inputProps={{ placeholder: 'Include A Date', style: pickerStyle }} onChange={this.handleAddDate.bind(this, 'include')} timeFormat={false} closeOnSelect={true}/>
                <button type='button' style={undoStyle} onClick={this.undoAddDate.bind(this, 'include')}>Undo Include</button>
                <label name='includeDates'>Currently Added: [{this.props.calendarForm.includeDates.map((date, i) => {
                  var newDate = "";
                  if(i === 0){
                    newDate = revertDate(date);
                  }
                  else{
                    newDate = ", " + revertDate(date);
                  }
                  return (<p key={i} style={dateStyle}>{newDate}</p>)})}]
                </label>
              </div>
            </div>
          </div>
          <div id='description/location'>
            <input type='text' style={inputStyle} placeholder='Description' onChange={this.handleChange.bind(this, 'description')}></input>
            <input type='text' style={inputStyle} placeholder='Location' onChange={this.handleChange.bind(this, 'location')}></input>
          </div>
          <div style={{textAlign: 'center'}}>
            <input type='submit' style={modalBtnStyle} value='Add Event'/>
            <button type='button' style={modalBtnStyle} onClick={this.launchMessageBtn.bind(this, this.generateTitle('How to add different types of events:'), helpMessage)}>Help</button>
            <button type='button' style={modalBtnStyle} onClick={this.onCloseModal}>Cancel</button>
          </div>
        </fieldset>
      </form>
    );

    return (
      <div>
        <div>
          <button type='button' style={buttonStyle} onClick={this.testBtn.bind(this)}>TEST</button>
          <button type='button' style={buttonStyle} onClick={this.onOpenModal}>Add Event(s)</button>
          <Modal open={this.props.calendarForm.modalState} onClose={this.onCloseModal} little>
            {addEventForm}
          </Modal>
          <Modal open={this.props.calendarForm.messageState} onClose={this.onCloseMessage} little>
            {this.props.calendarForm.messageTitle}
            {this.props.calendarForm.messageText}
          </Modal>
        </div>
        <div>
          <BigCalendar
            selectable
            popup
            events={this.props.calendarForm.events}
            defaultView='month'
            scrollToTime={new Date(1970, 1, 1, 6)}
            defaultDate={new Date()}
            onSelectEvent={event => this.generateSelectedEvent(event)}
            onSelectSlot={(slotInfo) => this.launchMessage('Empty Slot Selected', 'There are no events scheduled in this time slot')}
          />
        </div>
        <button type='button' style={modalBtnStyle} onClick={this.handleSave.bind(this)}>Save Calendar</button>
      </div>
    );
  }

}

var labelStyle = {
  fontWeight: "bold",
  marginRight: "5px",
}

var fieldsetStyle = {
  border: "1px solid black",
  width: "100%",
  background: "white",
  padding: "3px",
  margin: "auto"
}

var dateStyle = {
  display: "inline-block"
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

var buttonStyle = {
    display: 'flex',
    margin: 'auto',
    marginTop: '10px',
    marginBottom: '10px',
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "4px",
    paddingBottom: "4px",
    backgroundColor: "white",
    borderRadius: "4px",
    color: "#000080"
}

var undoStyle = {
  display: 'inline-block',
  margin: '10px 10px 10px 0px',
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "4px",
  paddingBottom: "4px",
  backgroundColor: "white",
  borderRadius: "4px",
  color: "#000080"
}

var pickerStyle = {
  display: 'inline-block',
  margin: 'auto',
  marginTop: '10px',
  marginBottom: '10px'
}

var chkbxStyle = {
  marginRight: "2px"
}

var inputStyle = {
  width: '300px',
  margin: '10px 5px 10px 5px'
}

const mapStateToProps = state => {

	return {
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
    setCalLoc: (loc) => dispatch(setCalLoc(loc)),
    setCalEvents: (events) => dispatch(setCalEvents(events)),
    setCalModalState: (modalState) => dispatch(setCalModalState(modalState)),
    setCalMessageState: (messageState) => dispatch(setCalMessageState(messageState)),
    setCalMessageText: (messageText) => dispatch(setCalMessageText(messageText)),
    setCalMessageTitle: (messageTitle) => dispatch(setCalMessageTitle(messageTitle)),
    setCalShowRecur: (showRecur) => dispatch(setCalShowRecur(showRecur)),
    setCalOriginalCal: (originalCal) => dispatch(setCalOriginalCal(originalCal)),
    setCalSTime: (sTime) => dispatch(setCalSTime(sTime)),
    setCalETime: (eTime) => dispatch(setCalETime(eTime))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarRobust);
