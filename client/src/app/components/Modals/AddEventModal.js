import React from 'react';
import TimeRange from '../Calendar/TimeRange.js';
import ModalWrapper from './ModalWrapper.js';
import moment from 'moment';
import Datetime from 'react-datetime';
import {connect} from 'react-redux';
import Event from '../../utils/Event.js';
import 'react-datetime/css/react-datetime.css';
import {getCurrentSemester, formatDate, revertDate, formatTime, getEventDT, isValidDate} from '../Calendar/CalendarUtils.js';
import {hideModal} from '../../Actions/modalActions.js';
import {clearForm, setCalRepeatDays, setCalRecurrence, setCalExcludeDates, setCalIncludeDates, setCalSDate, setCalEDate, setCalDescription, setCalEvents, setCalShowRecur, setCalSTime, setCalETime, setCalMultidayEvent} from '../../Actions/calFormActions.js';
import {showMessage, setMessageBody, setMessageTitle} from '../../Actions/messageActions.js';


class AddEventModal extends React.Component {

  constructor(props){
    super(props);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.addRecurringEvent = this.addRecurringEvent.bind(this);
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
          this.props.setCalRepeatDays([]);
          this.refs['chkbxMON'].checked = false;
          this.refs['chkbxTUE'].checked = false;
          this.refs['chkbxWED'].checked = false;
          this.refs['chkbxTHU'].checked = false;
          this.refs['chkbxFRI'].checked = false;
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

  //Updates the state of a change to any checkboxes
  handleCheckboxChange(e){
    const rDays = this.props.calendarForm.repeatDays;
    let index
    if(e.target.checked) {rDays.push(e.target.name);} //If one of the days (Mon-Fri) is checked, add that day to the list of ones checked
    else { //If it was unchecked
      index = rDays.indexOf(e.target.name); //Get the index of the box that was checked (essentially getting the day)
      rDays.splice(index, 1); //Remove that day from the list
    }
    this.props.setCalRepeatDays(rDays);
  }

  //Adds a date to either exclude dates or include dates when creating an event.
  handleAddDate(type, e){
    var m = false; //Default value false for moment object
    if(!moment.isMoment(e) && isValidDate(e)){ //If the value is a valid date but not yet a moment object
      m = moment(e, "MDY") //Make it a moment object
    }
    else if(moment.isMoment(e)){
      m = e;
    }
    if(!m){ //If m didn't get assigned to a value
      return;
    }
    else{ //There was a valid date and it was made into a moment object
      if(m.format("YYYYMMDD").toString() !== moment().format("YYYYMMDD").toString()){ //Check validity of formatting
        if(type === 'exclude'){ //If it is a date to be exluded
          const currentExcludes = this.props.calendarForm.excludeDates; //Get the current list of exluded dates
          let newDate = formatDate(m.format("YYYY-MM-DD").toString()); //Create the new date
          if(!currentExcludes.includes(newDate)){ //If the date isn't already present in the list
            const newExcludes = currentExcludes.concat(newDate);
            this.props.setCalExcludeDates(newExcludes); //Add it and update the state of the exluded dates list
          }
        }
        else if(type === 'include'){ //If it is an extra date to be included
          const currentIncludes = this.props.calendarForm.includeDates; //Same process as excluded dates
          let newDate = formatDate(m.format("YYYY-MM-DD").toString());
          if(!currentIncludes.includes(newDate)){
            const newIncludes = currentIncludes.concat(newDate);
            this.props.setCalIncludeDates(newIncludes);
          }
        }
      }
    }
  }

  //Removes the last date added to either exclude or include
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

  eventDoesConflict(event){
    let currentEvents = this.props.calendarForm.events;
    for(let e of currentEvents){
      if(((event.start >= e.start) && (event.start <= e.end)) || ((event.end >= e.start) && (event.end <= e.end))){
        return true;
      }
    }
    return false;
  }

  formIsValidated(){
    let form = this.props.calendarForm;
    let sDateValid = (form.sDate !== "");
    let sTimeValid = (form.sTime !== "");
    let eTimeValid = (form.eTime !== "");
    let descriptionValid = (form.description !== "");
    return (sDateValid && sTimeValid && eTimeValid && descriptionValid);
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

  //Adds a recurring event to the calendar (Doesn't save the calendar changes to the server!)
  addRecurringEvent(){
    let start = this.props.calendarForm.sDate; //Get the start/end dates, days to repeat on, and included and excluded dates
    let end = this.props.calendarForm.eDate;
    let repeatDays = this.props.calendarForm.repeatDays;
    let includes = this.props.calendarForm.includeDates;
    if(includes.length === 0){includes = -1} //Important for checking on server, do not change unless in both places.
    let excludes = this.props.calendarForm.excludeDates;
    if(excludes.length === 0){excludes = -1} //Important for checking on server, do not change unless in both places.
    fetch(('/api/calendar/recur/' + repeatDays + '/' + start + '/' + end + '/' + includes + '/' + excludes), { //Query the server to generate the list of dates based on the desired recurrence
      credentials: 'same-origin' // or 'include'
    }).then(res => (res.status === 200 || res.status === 204 || res.status === 304) ? res.json() : []
    ).then((json) => {
    this.props.setCalRecurrence(json); //Update the state with the list of dates in the recurrence
    let recurrence = this.props.calendarForm.recurrence;
    var conflictingEvents = [];
    let currentEvents = this.props.calendarForm.events;
    var date = new Date(); //Generate a timestamp as a "most-likely" unique recurrence id
    var components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    var recurrenceId = components.join("");
    for (let date of recurrence){ //For every date in the recurrence
      //Generate the start date of the recurrence
      let sDate = new Date(parseInt(date.substring(0, 4), 10), parseInt(date.substring(4, 6), 10)-1,
                           parseInt(date.substring(6,8), 10), this.props.calendarForm.sDate.getHours(), this.props.calendarForm.sDate.getMinutes());
      //Generate the end date of the recurrence
      let eDate = new Date(parseInt(date.substring(0, 4), 10), parseInt(date.substring(4, 6), 10)-1,
                           parseInt(date.substring(6,8), 10), this.props.calendarForm.eDate.getHours(), this.props.calendarForm.eDate.getMinutes());
      //Create the event with the appropriate data, assign to this unique recurrence with the generated recurrence id
      let newEvent = new Event(this.props.courseId, (this.props.courseTitle + ' ' + getCurrentSemester()), getEventDT(sDate, this.props.calendarForm.sTime),
                              getEventDT(eDate, this.props.calendarForm.eTime), this.props.calendarForm.description, this.props.calendarForm.room,
                              (getCurrentSemester() + ' ' + this.props.courseId), this.props.calendarForm.hexColor, true, recurrenceId);
      if(this.eventDoesConflict(newEvent)){
        conflictingEvents.push(newEvent);
      }
      else{
        currentEvents.push(newEvent); //Add the event to the list
      }
    }
    this.props.setCalEvents(currentEvents); //Add the array of dates (recurrence) to the calendar
    if(conflictingEvents.length > 0){
      const body = (
        <div>
          <div>
            <p>Warning! The following {conflictingEvents.length} events conflicted with other existing events and could not be added:</p>
            <ul>
              {conflictingEvents.map((event, i) => {
                var ev = ("Name: " + event.title + ", Date: " + event.start);
                return (<li key={i}>{ev}</li>)})}
            </ul>
            <p>All other events in this recurrence have been added.</p>
          </div>
        </div>
      );
      this.props.setMessageTitle("WARNING");
      this.props.setMessageBody(body);
      this.props.showMessage('CUSTOM');
    }
    this.onClose(); //Close the modal
    }).catch((err) => console.log(err));
  }

  //Takes the data input to the modal for a new event/multiday event/recurrence and calls the appropriate methods to add to the calendar gui
  handleSubmit(e){
    e.preventDefault();
    let start = this.props.calendarForm.sDate;
    let end = this.props.calendarForm.eDate;
    if(end === ""){
      end = start;
    }
    if(this.formIsValidated()){
      let isRecurringEvent = this.props.calendarForm.showRecur;
      let repeatDays = this.props.calendarForm.repeatDays;
      if(+start > +end){
        this.props.setMessageTitle("ERROR");
        this.props.setMessageBody('ERROR (Start Date later than End Date): Your ending date must be later than or the same as your starting date.');
        this.props.showMessage('CUSTOM');
      }
      if(isRecurringEvent){
        if(repeatDays.length > 0){
          if(+start === +end){ //If the user input a recurrence but set the same start and end date
            this.props.setMessageTitle("ERROR");
            this.props.setMessageBody('ERROR (Single Day Recurrence): If you want a recurring date, you must have the start and end dates be different.');
            this.props.showMessage('CUSTOM');
          }
          else {
            this.addRecurringEvent(); //Add a recurring event
          }
        }
        else{
          this.props.setMessageTitle("ERROR");
          this.props.setMessageBody("Error (No Repeat Days): In order to make a recurring event, you must check the boxes of the days you want the event to repeat on.");
          this.props.showMessage('CUSTOM');
          //error need to check repeat days
        }
      }
      else{ //If single event
        let newEvent = new Event(this.props.courseId, (this.props.courseTitle + ' ' + getCurrentSemester()), getEventDT(start, this.props.calendarForm.sTime),
                                 getEventDT(end, this.props.calendarForm.eTime), this.props.calendarForm.description, this.props.calendarForm.room,
                                 (getCurrentSemester() + ' ' + this.props.courseId), this.props.calendarForm.hexColor, false, null);
        this.addNewEvent(newEvent); //Add a single event
      }
    }
    else{
      this.props.setMessageTitle("ERROR");
      this.props.setMessageBody("ERROR (Incomplete form): You must complete the basic information of the form (Start Date, Start Time, End Time, Description) before submitting!");
      this.props.showMessage("CUSTOM");
    }
  }

  handleHelpMessage = () => {
    const helpMessage = (
      <div>
        <div>
          <p>To add a single event:</p>
          <ul>
            <li>Select a starting date (You can have an event span multiple days, just click the checkbox for Multi-Day Event!)</li>
            <li>Type in a start and end time for your event, and specify AM or PM</li>
            <li>Provide a description for your event</li>
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
            <li>Provide a description for the recurring event</li>
            <li>Click "Add Event"</li>
          </ul>
        </div>
      </div>
    );
    this.props.setMessageTitle("HELP");
    this.props.setMessageBody(helpMessage);
    this.props.showMessage('CUSTOM');
  };

  onClose = () => {
    this.props.clearForm();
    this.props.hideModal();
  }

  render() {
    var showEndDate = !(this.props.calendarForm.multidayEvent || this.props.calendarForm.showRecur);

    const addEventForm = (
      <form>
        <fieldset style={fieldsetStyle}>
          <div style={{textAlign: 'center'}}>
            <label style={labelStyle} htmlFor='showRecur'><input style={chkbxStyle} type='checkbox' name='showRecur' onChange={this.handleChange.bind(this, 'showRecur')}/>Create Recurring Event?</label>
            <label hidden={this.props.calendarForm.showRecur} style={labelStyle} htmlFor='multidayEvent'><input style={chkbxStyle} type='checkbox' name='multidayEvent' onChange={this.handleChange.bind(this, 'multidayEvent')} ref={'mdchkbx'}/>Multi-Day Event?</label>
          </div>
          <div>
            <Datetime inputProps={{ placeholder: 'Start Date: MM/DD/YYYY', style: pickerStyle }} onChange={this.handleChange.bind(this, 'sDate')} timeFormat={false} closeOnSelect={true}/>
          </div>
          <div hidden={showEndDate}>
            <Datetime inputProps={{ placeholder: 'End Date: MM/DD/YYYY', style: pickerStyle }} onChange={this.handleChange.bind(this, 'eDate')} timeFormat={false} closeOnSelect={true}/>
          </div>
          <div>
            <TimeRange handleChange={this.handleChange.bind(this)}/>
          </div>
          <div name='recurringEventDiv' hidden={!this.props.calendarForm.showRecur}>
            <div>
              <label style={labelStyle}>Repeat? (WEEKLY): </label>
              <label style={labelStyle} htmlFor='Monday'><input style={chkbxStyle} type='checkbox' name='Monday' onChange={this.handleCheckboxChange.bind(this)} ref={'chkbxMON'}/>Monday</label>
              <label style={labelStyle} htmlFor='Tuesday'><input style={chkbxStyle} type='checkbox' name='Tuesday' onChange={this.handleCheckboxChange.bind(this)} ref={'chkbxTUE'}/>Tuesday</label>
              <label style={labelStyle} htmlFor='Wednesday'><input style={chkbxStyle} type='checkbox' name='Wednesday' onChange={this.handleCheckboxChange.bind(this)} ref={'chkbxWED'}/>Wednesday</label>
              <label style={labelStyle} htmlFor='Thursday'><input style={chkbxStyle} type='checkbox' name='Thursday' onChange={this.handleCheckboxChange.bind(this)} ref={'chkbxTHU'}/>Thursday</label>
              <label style={labelStyle} htmlFor='Friday'><input style={chkbxStyle} type='checkbox' name='Friday' onChange={this.handleCheckboxChange.bind(this)} ref={'chkbxFRI'}/>Friday</label>
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
          <div id='description' style={{textAlign: 'center'}}>
            <input type='text' style={inputStyle} placeholder='Description' onChange={this.handleChange.bind(this, 'description')}></input>
          </div>
        </fieldset>
      </form>
    );

    const buttons = (
      <span>
        <button type='button' style={modalBtnStyle} onClick={this.handleSubmit.bind(this)}>Add Event</button>
        <button type='button' style={modalBtnStyle} onClick={this.handleHelpMessage}>Help</button>
      </span>
    );

    return (
      <ModalWrapper title="Add New Event(s)" body={addEventForm} footerBtns={buttons} hideModal={this.onClose} closeText="Cancel" closeStyle={modalBtnStyle}/>
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
    modalType: state.modal.modalType,
    calendarForm: state.calendarForm,
    courseId: state.token.lis_course_section_sourcedid,
    courseTitle: state.token.context_title
  };
};

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
    setMessageBody: (body) => dispatch(setMessageBody(body)),
    setMessageTitle: (title) => dispatch(setMessageTitle(title))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventModal);
