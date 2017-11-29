import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {connect} from "react-redux";
import {setCalSDate,
  setCalEDate,
  setCalSTime,
  setCalETime,
  setCalRecurDays,
  setCalExcludeDates,
  setCalIncludeDates,
  setCalDescription,
  setCalLoc,
  setCalCourseId,
  clearForm
  } from '../../Actions/calFormActions.js';

class CalendarForm extends React.Component {

  constructor(props){
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.revertDate = this.revertDate.bind(this);
    this.formatTime = this.formatTime.bind(this);
  }

  componentWillMount(){
    this.props.setCourseId(this.props.courseId);
    this.props.setCalSDate(moment().format("YYYYMMDD").toString());
    this.props.setCalEDate(moment().add(1, 'M').format("YYYYMMDD").toString());
  }

  componentWillUnmount(){
    this.props.clearForm();
  }

  isValidated(value, name) {
    if(name === 'sDate' || name === 'eDate'){
      return (value.length === 8);
    }
    else if(name === 'sTime' || name === 'eTime'){
      return (value.length === 6);
    }
    else if(name === 'recurDays' || name === 'description' || name === 'location'){
      return (value.length > 0);
    }
    else{
      return false;
    }
  }

  canBeSubmitted() {
    return (
      (this.isValidated(this.props.calendarForm.sDate, 'sDate')) &&
      (this.isValidated(this.props.calendarForm.eDate, 'eDate')) &&
      (this.isValidated(this.props.calendarForm.sTime, 'sTime')) &&
      (this.isValidated(this.props.calendarForm.eTime, 'eTime')) &&
      (this.isValidated(this.props.calendarForm.recurDays, 'recurDays')) &&
      (this.isValidated(this.props.calendarForm.description, 'description')) &&
      (this.isValidated(this.props.calendarForm.location, 'location'))
    );
  }

  handleSubmit(e){
    if(!this.canBeSubmitted()){
      e.preventDefault();
      return;
    }
    else{
      e.preventDefault();

      var options = {method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    credentials: 'same-origin',
                    body: JSON.stringify(this.props.calendarForm)};

      fetch('/api/calendar', options).then((response) => {
        return response.text()
      }).then((data) => console.log(data)).catch((err) => console.log(err));
    }
  }

  handleChange(name, e){
    switch(name){
      case 'sDate':
        this.props.setCalSDate(e.format("YYYYMMDD").toString());
        return;

      case 'eDate':
        this.props.setCalEDate(e.format("YYYYMMDD").toString());
        return;

      case 'sTime':
        this.props.setCalSTime(this.formatTime(e.target.value));
        return;

      case 'eTime':
        this.props.setCalETime(this.formatTime(e.target.value));
        return;

      case 'description':
        this.props.setCalDescription(e.target.value);
        return;

      case 'location':
        this.props.setCalLoc(e.target.value);
        return;

      default:
        console.log("error", name);
        return;
    }
  }


  handleCheckboxChange(e){
    const rDays = this.props.calendarForm.recurDays;
    let index

    if(e.target.checked) {
      rDays.push(e.target.name);
    }
    else {
      index = rDays.indexOf(e.target.name);
      rDays.splice(index, 1);
    }

    this.props.setCalRecurDays(rDays);
  }

  handleAddDate(name, e){
    if(e.format("YYYYMMDD").toString() !== moment().format("YYYYMMDD").toString()){
      if(name === 'exclude'){
        const currentExcludes = this.props.calendarForm.excludeDates;
        const newExcludes = currentExcludes.concat(this.formatDate(e.format("YYYY-MM-DD").toString()));
        this.props.setCalExcludeDates(newExcludes);
      }
      else if(name === 'include'){
        const currentIncludes = this.props.calendarForm.includeDates;
        const newIncludes = currentIncludes.concat(this.formatDate(e.format("YYYY-MM-DD").toString()));
        this.props.setCalIncludeDates(newIncludes);
      }
    }
  }

  formatDate(date) {
    var split = date.split("-");
    return split[0] + split[1] + split[2];
  }

  revertDate(date) { //20171014
    var yyyy = date.substring(0, 4);
    var mm = date.substring(4, 6);
    var dd = date.substring(6, 8);

    return mm + "/" + dd + "/" + yyyy;
  }

  formatTime(time) { //Formats time from form format to ics format
    var str = time.split(":");
    return str[0] + str[1] + "00";
  }

  render() {
    const isEnabled = this.canBeSubmitted();

    return (
      <div className='calForm'>
        <h1 style = {headerStyle}>New Recording Schedule: {this.props.courseTitle}</h1>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset style={fieldsetStyle}>
            <div>
              <label style={labelStyle} htmlFor='sDate'>Start Date: </label>
              <DatePicker customInput={<button style={buttonStyle}>{moment(this.props.calendarForm.sDate).format("MM/DD/YYYY").toString()}</button>} openToDate={moment(this.props.calendarForm.sDate)} onChange={this.handleChange.bind(this, 'sDate')}/>
            </div>
            <div style = {timeStyle}>
              <div style = {startTimeStyle} >
                <label style={labelStyle} htmlFor='sTime'>Start Time: </label>
                <input style={inputStyle} type='time' placeholder='Start Time: hh:mm AM/PM' name='sTime' onChange={this.handleChange.bind(this, 'sTime')}/>
              </div>
              <div style = {endTimeStyle} >
                <label style={labelStyle} htmlFor='eTime'>End Time: </label>
                <input style={inputStyle} type='time' placeholder='End Time: hh:mm AM/PM' name='eTime' onChange={this.handleChange.bind(this, 'eTime')}/>
              </div>
            </div>
            <div>
              <label style={labelStyle} htmlFor='eDate'>End Date: </label>
              <DatePicker customInput={<button style={buttonStyle}>{moment(this.props.calendarForm.eDate).format("MM/DD/YYYY").toString()}</button>} openToDate={moment(this.props.calendarForm.eDate)} onChange={this.handleChange.bind(this, 'eDate')}/>
            </div>
            <div>
              <label style={labelStyle}>Repeat (WEEKLY): </label>
              <label style={dayStyle} htmlFor='Monday'><input style={chkbxStyle} type='checkbox' name='Monday' onChange={this.handleCheckboxChange.bind(this)}/>Monday</label>
              <label style={dayStyle} htmlFor='Tuesday'><input style={chkbxStyle} type='checkbox' name='Tuesday' onChange={this.handleCheckboxChange.bind(this)}/>Tuesday</label>
              <label style={dayStyle} htmlFor='Wednesday'><input style={chkbxStyle} type='checkbox' name='Wednesday' onChange={this.handleCheckboxChange.bind(this)}/>Wednesday</label>
              <label style={dayStyle} htmlFor='Thursday'><input style={chkbxStyle} type='checkbox' name='Thursday' onChange={this.handleCheckboxChange.bind(this)}/>Thursday</label>
              <label style={dayStyle} htmlFor='Friday'><input style={chkbxStyle} type='checkbox' name='Friday' onChange={this.handleCheckboxChange.bind(this)}/>Friday</label>
            </div>
            <div>
              <DatePicker customInput={<button style={buttonStyle}>Exclude A Date</button>} openToDate={moment()} onChange={this.handleAddDate.bind(this, 'exclude')}/>
              <label style = {labelStyle} name='excludeDates'>Currently Excluded: [{this.props.calendarForm.excludeDates.map((date, i) => {
                var newDate = "";
                if(i === 0){
                  newDate = this.revertDate(date);
                }
                else{
                  newDate = ", " + this.revertDate(date);
                }
                return (<p key={i} style={dateStyle}>{newDate}</p>)})}]
              </label>
            </div>
            <div>
              <DatePicker customInput={<button style={buttonStyle}>Include Extra Date</button>} openToDate={moment()} value='Pick a date to include' onChange={this.handleAddDate.bind(this, 'include')}/>
              <label style = {labelStyle} name='includeDates'>Currently Added: [{this.props.calendarForm.includeDates.map((date, i) => {
                var newDate = "";
                if(i === 0){
                  newDate = this.revertDate(date);
                }
                else{
                  newDate = ", " + this.revertDate(date);
                }
                return (<p key={i} style={dateStyle}>{newDate}</p>)})}]
              </label>
            </div>
            <div style = {classDescriptionStyle}>
              <div style = {descriptionStyle} >
                <label style = {labelStyle} htmlFor='description'>Description: </label>
                <input style={inputStyle} type='text' placeholder='Class description...' name='description' onChange={this.handleChange.bind(this, 'description')}/>
              </div>
              <div style = {locationStyle} >
                <label style = {labelStyle} htmlFor='location'>Location: </label>
                <input style={inputStyle} type='text' placeholder='Class location...' name='location' onChange={this.handleChange.bind(this, 'location')}/>
              </div>
            </div>
            <div>
              <input type='submit' style={submitStyle} disabled={!isEnabled} value='Create Schedule'/>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
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
    setCalRecurDays: (days) => dispatch(setCalRecurDays(days)),
    setCalExcludeDates: (dates) => dispatch(setCalExcludeDates(dates)),
    setCalIncludeDates: (dates) => dispatch(setCalIncludeDates(dates)),
    setCalSDate: (date) => dispatch(setCalSDate(date)),
    setCalEDate: (date) => dispatch(setCalEDate(date)),
    setCalSTime: (time) => dispatch(setCalSTime(time)),
    setCalETime: (time) => dispatch(setCalETime(time)),
    setCalDescription: (desc) => dispatch(setCalDescription(desc)),
    setCalLoc: (loc) => dispatch(setCalLoc(loc))
	}
};

var buttonStyle = {
    backgroundColor: "white",
    borderRadius: "4px",
    marginBottom: "25px",
    color: "#000080",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "4px",
    paddingBottom: "4px",
}

var dateStyle = {
  display: "inline-block"
}

var inputStyle = {
  boxSizing: "border-box"
}

var chkbxStyle = {
  marginRight: "2px"
}

var labelStyle = {
  fontWeight: "bold",
  marginRight: "5px",
  fontSize: "16px"
}

var fieldsetStyle = {
  border: "1px solid black",
  width: "50%",
  background: "white",
  padding: "3px",
  margin: "auto"
}

var headerStyle = {
  fontWeight: "bold",
	fontSize: "36px",
	marginBottom: "40px"
}

var startTimeStyle = {
  float: "left",
  marginLeft: "10px"
}

var endTimeStyle = {
  float: "right",
  marginRight: "10px"
}

var descriptionStyle = {
  float: "left",
  marginLeft: "10px"
}

var locationStyle = {
  float: "right",
  marginRight: "10px"
}

var timeStyle = {
  marginBottom: "50px"
}

var classDescriptionStyle = {
  marginBottom: "50px"
}

var dayStyle = {
  fontSize: "16px",
  marginRight: "5px",
}

var submitStyle = {
  width: "50%",
    backgroundColor: "#4CAF50",
    color: "white",
    padding: "14px 20px",
    margin: "8px 0",
    border: "none",
    borderRadius: "4px"
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarForm);
