import React from 'react';
import './CalendarForm.css'

class CalendarForm extends React.Component {

  constructor(props){
    super(props);
    this.handleAddExclude = this.handleAddExclude.bind(this);
    this.handleExcludeChange = this.handleExcludeChange.bind(this);
    this.handleAddInclude = this.handleAddInclude.bind(this);
    this.handleIncludeChange = this.handleIncludeChange.bind(this);
    this.formatDate = this.formatDate.bind(this);
    this.revertDate = this.revertDate.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.handleSTime = this.handleSTime.bind(this);
    this.handleETime = this.handleETime.bind(this);
    this.handleSDate = this.handleSDate.bind(this);
    this.handleEDate = this.handleEDate.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleLocation = this.handleLocation.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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

  canBeSubmitted() {
    return (
      this.state.sDate.length > 0 &&
      this.state.eDate.length > 0 &&
      this.state.sTime.length > 0 &&
      this.state.eTime.length > 0 &&
      this.state.recurDays.length > 0 &&
      this.state.description.length > 0 &&
      this.state.location.length > 0
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

  handleExcludeChange(e) {
    e.preventDefault();
    this.setState({ currentExclude: e.target.value });
  }

  handleAddExclude(e){
    e.preventDefault();
    const currentExcludes = this.state.excludeDates;
    const newExcludes = currentExcludes.concat(this.formatDate(this.state.currentExclude));
    this.setState({excludeDates: newExcludes});
  }

  handleIncludeChange(e) {
    e.preventDefault();
    this.setState({ currentInclude: e.target.value });
  }

  handleAddInclude(e){
    e.preventDefault();
    const currentIncludes = this.state.includeDates;
    const newIncludes = currentIncludes.concat(this.formatDate(this.state.currentInclude));
    this.setState({includeDates: newIncludes});
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

  handleSDate(e) {
   this.setState({sDate: this.formatDate(e.target.value)});
  }

  handleEDate(e) {
   this.setState({eDate: this.formatDate(e.target.value)});
  }

  handleSTime(e) {
   this.setState({sTime: this.formatTime(e.target.value)});
  }

  handleETime(e){
    this.setState({eTime: this.formatTime(e.target.value)});
  }

  handleLocation(e){
    this.setState({location: e.target.value});
  }

  handleDescription(e){
    this.setState({description: e.target.value});
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
  }

  render() {
    const isEnabled = this.canBeSubmitted();

    return (
      <div className='calForm'>
        <form onSubmit={this.handleSubmit}>
          <fieldset style={fieldsetStyle}>
            <legend style={legendStyle}>New Recording Schedule: {this.props.courseId}</legend>
            <div>
              <label style={labelStyle} htmlFor='sDate'>Start Date: </label>
              <input style={inputStyle} id='startDate' type='date' placeholder='Start Date: mm/dd/yyyy hh:mm' name='sDate' onChange={this.handleSDate}/>
            </div>
            <div>
              <label style={labelStyle} htmlFor='sTime'>Start Time: </label>
              <input style={inputStyle} id='begin' type='time' placeholder='Start Time: hh:mm AM/PM' name='sTime' onChange={this.handleSTime}/>
              <label style={labelStyle} htmlFor='eTime'>End Time: </label>
              <input style={inputStyle} id='endTime' type='time' placeholder='End Time: hh:mm AM/PM' name='eTime' onChange={this.handleETime}/>
            </div>
            <div>
              <label style={labelStyle} htmlFor='eDate'>End Date: </label>
              <input style={inputStyle} id='endDate' type='date' placeholder='End Date: mm/dd/yyyy' name='eDate' onChange={this.handleEDate}/>
            </div>
            <div>
              <label style={labelStyle}>Repeat (WEEKLY): </label>
              <label style={labelStyle} htmlFor='Monday'><input style={chkbxStyle} type='checkbox' name='Monday' onChange={this.handleCheckboxChange}/>Monday</label>
              <label style={labelStyle} htmlFor='Tuesday'><input style={chkbxStyle} type='checkbox' name='Tuesday' onChange={this.handleCheckboxChange}/>Tuesday</label>
              <label style={labelStyle} htmlFor='Wednesday'><input style={chkbxStyle} type='checkbox' name='Wednesday' onChange={this.handleCheckboxChange}/>Wednesday</label>
              <label style={labelStyle} htmlFor='Thursday'><input style={chkbxStyle} type='checkbox' name='Thursday' onChange={this.handleCheckboxChange}/>Thursday</label>
              <label style={labelStyle} htmlFor='Friday'><input style={chkbxStyle} type='checkbox' name='Friday' onChange={this.handleCheckboxChange}/>Friday</label>
            </div>
            <div>
              <label style={labelStyle} htmlFor='exclude'>Exclude Date: </label>
              <input style={inputStyle} type='date' placeholder='Exclude: mm/dd/yyyy' name='exclude' onChange={this.handleExcludeChange}/>
              <button style={buttonStyle} onClick={this.handleAddExclude}>Exclude</button>
              <label name='excludeDates'>Currently Excluded: [{this.state.excludeDates.map((date, i) => {
                var newDate = this.revertDate(date);
                return (<p key={i} style={dateStyle}>{newDate},&nbsp;</p>)})}]
              </label>
            </div>
            <div>
              <label style={labelStyle} htmlFor='include'>Add Extra Date: </label>
              <input style={inputStyle} type='date' placeholder='Add: mm/dd/yyyy' name='include' onChange={this.handleIncludeChange}/>
              <button style={buttonStyle} className='pure-button pure-button-primary' onClick={this.handleAddInclude}>Add</button>
              <label name='includeDates'>Currently Added: [{this.state.includeDates.map((date, i) => {
                var newDate = this.revertDate(date);
                return (<p key={i} style={dateStyle}>{newDate},&nbsp;</p>)})}]
              </label>
            </div>
            <div>
              <label className='datelbl' htmlFor='description'>Description: </label>
              <input className='dateInput' style={inputStyle} id='description' type='text' placeholder='Class description...' name='description' onChange={this.handleDescription}/>
              <label className='datelbl' htmlFor='location'>Location: </label>
              <input className='dateInput' style={inputStyle} id='location' type='text' placeholder='Class location...' name='location' onChange={this.handleLocation}/>
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

export default CalendarForm;
