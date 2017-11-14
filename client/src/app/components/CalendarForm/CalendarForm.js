import React from 'react';
import {connect} from "react-redux";
import {setCalSDate,
  setCalEDate,
  setCalSTime,
  setCalETime,
  setCalRecurDays,
  setCalExcludeDates,
  setCalIncludeDates,
  setCalCurExDates,
  setCalCurIncDates,
  setCalDescription,
  setCalLoc,
  setCalCourseId,
  clearForm
  } from '../../Actions/action.js';

class CalendarForm extends React.Component {

  constructor(props){
    super(props);
    this.formatDate = this.formatDate.bind(this);
    this.revertDate = this.revertDate.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.state ={
      sDate: "",
      eDate: "",
      sTime: "",
      eTime: "",
      recurDays: [],
      excludeDates: [],
      includeDates: [],
      currentExclude: "",
      currentInclude: "",
      description: "",
      location: "",
      courseId: this.props.courseId
    };
  }

  componentWillMount(){
    this.props.setCourseId(this.props.courseId);
  }

  componentWillUnmount(){
    this.props.clearForm();
  }

  canBeSubmitted() {
    return (
      (this.state.sDate.length > 0) &&
      (this.state.eDate.length > 0) &&
      (this.state.sTime.length > 0) &&
      (this.state.eTime.length > 0) &&
      (this.state.recurDays.length > 0) &&
      (this.state.description.length > 0) &&
      (this.state.location.length > 0)
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
                    body: JSON.stringify({
                      sDate: this.state.sDate,
                      eDate: this.state.eDate,
                      sTime: this.state.sTime,
                      eTime: this.state.eTime,
                      recurDays: this.state.recurDays,
                      excludeDates: this.state.excludeDates,
                      includeDates: this.state.includeDates,
                      description: this.state.description,
                      location: this.state.location,
                      courseId: this.state.courseId
                    })};

      fetch('/calendar', options).then((response) => {
        return response.text()
      }).then((data) => console.log(data)).catch((err) => console.log(err));
    }
  }

  handleChange(e) {
    //e.preventDefault();
    var change = {};
    if(e.target.name === 'sDate' || e.target.name === 'eDate'){
      change[e.target.name] = this.formatDate(e.target.value);
    }
    else if(e.target.name === 'sTime' || e.target.name === 'eTime'){
      change[e.target.name] = this.formatTime(e.target.value);
    }
    else {
      change[e.target.name] = e.target.value;
    }
    this.setState(change);
  }

  handleCheckboxChange(e){
    const rDays = this.state.recurDays;
    let index

    if(e.target.checked) {
      rDays.push(e.target.name);
    }
    else {
      index = rDays.indexOf(e.target.name);
      rDays.splice(index, 1);
    }

    this.setState({recurDays: rDays});
    this.props.setCalRecurDays({recurDays: rDays});
  }

  handleAddExclude(e){
    e.preventDefault();
    const currentExcludes = this.state.excludeDates;
    const newExcludes = currentExcludes.concat(this.formatDate(this.state.currentExclude));
    this.setState({excludeDates: newExcludes});
    this.props.setCalExcludeDates({excludeDates: newExcludes});
  }

  handleAddInclude(e){
    e.preventDefault();
    const currentIncludes = this.state.includeDates;
    const newIncludes = currentIncludes.concat(this.formatDate(this.state.currentInclude));
    this.setState({includeDates: newIncludes});
    this.props.setCalIncludeDates({includeDates: newIncludes});
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

    console.log("Cal State", this.props.calendarForm);

    const isEnabled = this.canBeSubmitted();

    return (
      <div className='calForm'>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>New Recording Schedule: {this.props.courseId}</legend>
            <div>
              <label style={labelStyle} htmlFor='sDate'>Start Date: </label>
              <input style={inputStyle} type='date' placeholder='Start Date: mm/dd/yyyy hh:mm' name='sDate' onChange={this.handleChange.bind(this)}/>
            </div>
            <div>
              <label style={labelStyle} htmlFor='sTime'>Start Time: </label>
              <input style={inputStyle} type='time' placeholder='Start Time: hh:mm AM/PM' name='sTime' onChange={this.handleChange.bind(this)}/>
              <label style={labelStyle} htmlFor='eTime'>End Time: </label>
              <input style={inputStyle} type='time' placeholder='End Time: hh:mm AM/PM' name='eTime' onChange={this.handleChange.bind(this)}/>
            </div>
            <div>
              <label style={labelStyle} htmlFor='eDate'>End Date: </label>
              <input style={inputStyle} type='date' placeholder='End Date: mm/dd/yyyy' name='eDate' onChange={this.handleChange.bind(this)}/>
            </div>
            <div>
              <label style={labelStyle}>Repeat (WEEKLY): </label>
              <label style={labelStyle} htmlFor='Monday'><input style={chkbxStyle} type='checkbox' name='Monday' onChange={this.handleCheckboxChange.bind(this)}/>Monday</label>
              <label style={labelStyle} htmlFor='Tuesday'><input style={chkbxStyle} type='checkbox' name='Tuesday' onChange={this.handleCheckboxChange.bind(this)}/>Tuesday</label>
              <label style={labelStyle} htmlFor='Wednesday'><input style={chkbxStyle} type='checkbox' name='Wednesday' onChange={this.handleCheckboxChange.bind(this)}/>Wednesday</label>
              <label style={labelStyle} htmlFor='Thursday'><input style={chkbxStyle} type='checkbox' name='Thursday' onChange={this.handleCheckboxChange.bind(this)}/>Thursday</label>
              <label style={labelStyle} htmlFor='Friday'><input style={chkbxStyle} type='checkbox' name='Friday' onChange={this.handleCheckboxChange.bind(this)}/>Friday</label>
            </div>
            <div>
              <label style={labelStyle} htmlFor='exclude'>Exclude Date: </label>
              <input style={inputStyle} type='date' placeholder='Exclude: mm/dd/yyyy' name='currentExclude' onChange={this.handleChange.bind(this)}/>
              <button style={buttonStyle} onClick={this.handleAddExclude.bind(this)}>Exclude</button>
              <label name='excludeDates'>Currently Excluded: [{this.state.excludeDates.map((date, i) => {
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
              <label style={labelStyle} htmlFor='include'>Add Extra Date: </label>
              <input style={inputStyle} type='date' placeholder='Add: mm/dd/yyyy' name='currentInclude' onChange={this.handleChange.bind(this)}/>
              <button style={buttonStyle} className='pure-button pure-button-primary' onClick={this.handleAddInclude.bind(this)}>Add</button>
              <label name='includeDates'>Currently Added: [{this.state.includeDates.map((date, i) => {
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
              <label htmlFor='description'>Description: </label>
              <input style={inputStyle} type='text' placeholder='Class description...' name='description' onChange={this.handleChange.bind(this)}/>
              <label htmlFor='location'>Location: </label>
              <input style={inputStyle} type='text' placeholder='Class location...' name='location' onChange={this.handleChange.bind(this)}/>
            </div>
            <div>
              <input type='submit' style={buttonStyle} disabled={!isEnabled} value='Create Schedule'/>
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
		courseId: state.token.lis_course_section_sourcedid
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	
	return {
    clearForm: () => dispatch(clearForm()),
    setCourseId: id => dispatch(setCalCourseId(id)),
    setCalRecurDays: (days) => dispatch(setCalRecurDays(days)),
    setCalExcludeDates: (dates) => dispatch(setCalExcludeDates(dates)),
    setCalIncludeDates: (dates) => dispatch(setCalIncludeDates(dates))
	}
};

var buttonStyle = {
    backgroundColor: "white",
    borderRadius: "4px",
    marginTop: "10px",
    marginRight: "5px",
    color: "#000080",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "4px",
    paddingBottom: "4px"
}

var dateStyle = {
  display: "inline-block"
}

var inputStyle = {
  margin: "10px 5px 10px",
  boxSizing: "border-box"
}

var chkbxStyle = {
  marginRight: "2px"
}

var labelStyle = {
  fontWeight: "bold",
  marginRight: "5px"
}

var fieldsetStyle = {
  border: "1px solid black",
  width: "50%",
  background: "white",
  padding: "3px",
  margin: "auto"
}

var legendStyle = {
  background: "#000080",
  padding: "6px",
  fontWeight: "bold",
  color: "white"
}

export default connect(mapStateToProps, mapDispatchToProps)(CalendarForm);
