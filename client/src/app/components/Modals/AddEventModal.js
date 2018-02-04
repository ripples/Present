import React from 'react';
import TimeRange from '../CalendarForm/TimeRange.js';
import ModalWrapper from './ModalWrapper.js';
import moment from 'moment';
import Datetime from 'react-datetime';
import {connect} from 'react-redux';
import 'react-datetime/css/react-datetime.css';
import {getCurrentSemester, formatDate, revertDate, formatTime, getEventDT, isValidDate} from '../CalendarForm/CalendarUtils.js';
import {hideModal} from '../../Actions/modalActions.js';
import {clearForm, setCalRepeatDays, setCalRecurrence, setCalExcludeDates, setCalIncludeDates, setCalSDate, setCalEDate, setCalDescription, setCalEvents, setCalShowRecur, setCalSTime, setCalETime, setCalMultidayEvent} from '../../Actions/calFormActions.js';

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

class AddEventModal extends React.Component {

  constructor(props){
    super(props);
    this.addNewEvent = this.addNewEvent.bind(this);
    this.addRecurringEvent = this.addRecurringEvent.bind(this);
    this.clear = this.clear.bind(this);
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

  handleAddDate(type, e){
    var m = false;
    if(!moment.isMoment(e) && isValidDate(e)){
      m = moment(e, "MDY")
    }
    else if(moment.isMoment(e)){
      m = e;
    }
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
    if(this.props.modalType){
      this.onCloseModal();
    }
  }

  addRecurringEvent(){
    let start = this.props.calendarForm.sDate;
    let end = this.props.calendarForm.eDate;
    let repeatDays = this.props.calendarForm.repeatDays;
    let includes = this.props.calendarForm.includeDates;
    if(includes.length === 0){includes = -1} //Important for checking on server, do not change unless in both places.
    let excludes = this.props.calendarForm.excludeDates;
    if(excludes.length === 0){excludes = -1} //Important for checking on server, do not change unless in both places.
    fetch(('/api/calendar/recur/' + repeatDays + '/' + start + '/' + end + '/' + includes + '/' + excludes), {
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
                              getEventDT(eDate, this.props.calendarForm.eTime), this.props.calendarForm.description, this.props.calendarForm.room,
                              (getCurrentSemester() + ' ' + this.props.courseId), this.props.calendarForm.hexColor);
      currentEvents.push(newEvent);
    }
    let newEvents = currentEvents;
    this.props.setCalEvents(newEvents);
    this.onCloseModal();
    }).catch((err) => console.log(err));
  }

  handleSubmit(e){
    e.preventDefault();
    let start = this.props.calendarForm.sDate;
    let end = this.props.calendarForm.eDate;
    if(end === ""){
      end = start;
    }
    let repeatDays = this.props.calendarForm.repeatDays;
    if(+start > +end){
      //this.launchMessage('ERROR: Start Date later than End Date', 'Your ending date must be later than or the same as your starting date.');
      console.log('ERROR: Start Date later than End Date', 'Your ending date must be later than or the same as your starting date.');
    }
    else if(repeatDays.length === 0){
      let newEvent = new Event(this.props.courseId, (this.props.courseTitle + ' ' + getCurrentSemester()), getEventDT(start, this.props.calendarForm.sTime),
                               getEventDT(end, this.props.calendarForm.eTime), this.props.calendarForm.description, this.props.calendarForm.room,
                               (getCurrentSemester() + ' ' + this.props.courseId), this.props.calendarForm.hexColor);
      this.addNewEvent(newEvent); //Add a single event
    }
    else {
      if(+start === +end && repeatDays.length !== 0){ //If the user input a recurrence but set the same start and end date
        //this.launchMessage('ERROR: Single Day Recurrence', 'If you want a recurring date, you must have the start and end dates be different.');
        console.log('ERROR: Single Day Recurrence', 'If you want a recurring date, you must have the start and end dates be different.');
      }
      else {
        this.addRecurringEvent(); //Add a recurring event
      }
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

  onHideModal = () => {
    this.clear();
    this.props.hideModal();
  };

  render() {

    var showEndDate = !(this.props.calendarForm.multidayEvent || this.props.calendarForm.showRecur);

    const addEventForm = (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <fieldset style={fieldsetStyle}>
          <div>
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
          <div id='description'>
            <input type='text' style={inputStyle} placeholder='Description' onChange={this.handleChange.bind(this, 'description')}></input>
          </div>
        </fieldset>
      </form>
    );

    const buttons = (
        <input type='submit' style={modalBtnStyle} value='Add Event'/>
    );

    return (
      <ModalWrapper title="Add New Event(s)" body={addEventForm} footerBtns={buttons} hideModal={this.onHideModal} closeText="Cancel" closeStyle={modalBtnStyle}/>
    );
  }
}

//<button type='button' style={modalBtnStyle} onClick={this.launchMessageBtn.bind(this, this.generateTitle('How to add different types of events:'), helpMessage)}>Help</button>

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
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(AddEventModal);
