import React from 'react';
import './CalendarForm.css'

class CalendarForm extends React.Component {

  constructor(props){
    super(props);
    this.handleAddExclude = this.handleAddExclude.bind(this);
    this.handleExcludeChange = this.handleExcludeChange.bind(this);
    this.formatExclude = this.formatExclude.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.handleSTime = this.handleSTime.bind(this);
    this.handleETime = this.handleETime.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state ={
      sDate: "",
      eDate: "",
      sTime: "",
      eTime: "",
      recurDays: [],
      excludeDates: [],
      currentExclude: "",
      description: "",
      location: "",
      summary: "",
      courseId: this.props.courseId
    };
  }

  handleSubmit(e){
    e.preventDefault();

    var myInit = {method: 'post',
                  body: {
                    "sDate": this.sDate.value,
                    "eDate": this.eDate.value,
                    "sTime": this.state.sTime,
                    "eTime": this.state.eTime,
                    "recurDays": this.state.recurDays,
                    "excludeDates": this.state.excludeDates,
                    "description": this.description.value,
                    "location": this.location.value,
                    "summary": this.summary.value,
                    "courseId": this.state.courseId
                  }};

    fetch('/calendar', myInit).then((res) => {
      return res.text()
    }).then((data) => console.log(data)).catch((err) => console.log(err));
  }

  handleExcludeChange(e) {
    e.preventDefault();
    this.setState({ currentExclude: e.target.value });
  }

  handleAddExclude(e){
    e.preventDefault();
    const currentExcludes = this.state.excludeDates;
    const newExcludes = currentExcludes.concat(this.formatExclude(this.state.currentExclude));
    this.setState({excludeDates: newExcludes}, function(){
      console.log(this.state.excludeDates);
    });
  }

  formatExclude(excludedDate) {
    var split = excludedDate.split("-");
    return split[0] + split[1] + split[2];
  }

  formatTime(time) { //Formats time from form format to ics format
    var str = time.split(":");
    return str[0] + str[1] + "00";
  }

  handleSTime(e) {
   this.setState({sTime: this.formatTime(e.target.value)}, function () {
     console.log(this.state.sTime);
   });
  }

  handleETime(e){
    this.setState({eTime: this.formatTime(e.target.value)}, function () {
      console.log(this.state.eTime);
    });
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

    this.setState({recurDays: rDays}, function() {
      console.log(this.state.recurDays);
    });
  }

  render() {
    return (
      <div className='calForm'>
        <form onSubmit={this.handleSubmit}>
          <fieldset>
            <legend>New Recording Schedule: {this.props.courseId}</legend>
            <div className='input_block'>
              <label className='datelbl' htmlFor='sDate'>Start Date: </label>
              <input ref={(ref) => {this.sDate = ref}} className='dateInput' id='startDate' type='date' placeholder='Start Date: mm/dd/yyyy hh:mm' name='sDate'/>
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='sTime'>Start Time: </label>
              <input className='dateInput' id='begin' type='time' placeholder='Start Time: hh:mm AM/PM' name='sTime' onChange={this.handleSTime}/>
              <label className='datelbl' htmlFor='eTime'>End Time: </label>
              <input className='dateInput' id='endTime' type='time' placeholder='End Time: hh:mm AM/PM' name='eTime' onChange={this.handleETime}/>
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='eDate'>End Date: </label>
              <input ref={(ref) => {this.eDate = ref}} className='dateInput' id='endDate' type='date' placeholder='End Date: mm/dd/yyyy' name='eDate'/>
            </div>
            <div className='input_block'>
              <p>Repeat (WEEKLY): </p>
              <label className='chkbxlbl' htmlFor='Monday'><input className='repeat' type='checkbox' name='Monday' onChange={this.handleCheckboxChange}/>Monday</label>
              <label className='chkbxlbl' htmlFor='Tuesday'><input className='repeat' type='checkbox' name='Tuesday' onChange={this.handleCheckboxChange}/>Tuesday</label>
              <label className='chkbxlbl' htmlFor='Wednesday'><input className='repeat' type='checkbox' name='Wednesday' onChange={this.handleCheckboxChange}/>Wednesday</label>
              <label className='chkbxlbl' htmlFor='Thursday'><input className='repeat' type='checkbox' name='Thursday' onChange={this.handleCheckboxChange}/>Thursday</label>
              <label className='chkbxlbl' htmlFor='Friday'><input className='repeat' type='checkbox' name='Friday' onChange={this.handleCheckboxChange}/>Friday</label>
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='exclude'>Exclude Date: </label>
              <input className='dateInput' type='date' placeholder='Exclude: mm/dd/yyyy' name='exclude' onChange={this.handleExcludeChange}/>
              <button className='exclude-button' className='pure-button pure-button-primary' onClick={this.handleAddExclude}>Exclude</button>
              <label className='datelbl' name='excludeDates'>{this.state.excludeDates}</label>
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='description'>Description: </label>
              <input ref={(ref) => {this.description = ref}} className='dateInput' id='description' type='text' placeholder='Class description...' name='description'/>
              <label className='datelbl' htmlFor='location'>Location: </label>
              <input ref={(ref) => {this.location = ref}} className='dateInput' id='location' type='text' placeholder='Class location...' name='location'/>
              <label className='datelbl' htmlFor='summary'>Summary: </label>
              <input ref={(ref) => {this.summary = ref}} className='dateInput' id='summary' type='text' placeholder='Class summary...' name='summary'/>
            </div>
            <div className='input_block'>
              <input type='submit' value='Create Schedule'/>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default CalendarForm;
