import React from 'react';
import './CalendarForm.css'

class CalendarForm extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      sDate: "YYYYMMDD",
      eDate: "YYYYMMDD",
      sTime: "HHMMSS",
      eTime: "HHMMSS",
      recurDays: [],
      excludeDates: ["No dates excluded"],
      description: "",
      location: "",
      summary: ""
    };
  }

  render() {
    return (
      <div className='calForm'>
        <form action='/calendar' method='POST'>
          <fieldset>
            <legend>New Recording Schedule: {this.props.courseId}</legend>
            <div className='input_block'>
              <label className='datelbl' htmlFor='sDate'>Start Date: </label>
              <input className='dateInput' id='startDate' type='date' placeholder='Start Date: mm/dd/yyyy hh:mm' name='sDate' />
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='sTime'>Start Time: </label>
              <input className='dateInput' id='begin' type='time' placeholder='Start Time: hh:mm AM/PM' name='sTime'/>
              <label className='datelbl' htmlFor='eTime'>End Time: </label>
              <input className='dateInput' id='endTime' type='time' placeholder='End Time: hh:mm AM/PM' name='eTime'/>
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='eDate'>End Date: </label>
              <input className='dateInput' id='endDate' type='date' placeholder='End Date: mm/dd/yyyy' name='eDate'/>
            </div>
            <div className='input_block'>
              <p>Repeat (WEEKLY): </p>
              <label className='chkbxlbl' htmlFor='Monday'><input className='repeat' type='checkbox' name='Monday'/>Monday</label>
              <label className='chkbxlbl' htmlFor='Tuesday'><input className='repeat' type='checkbox' name='Tuesday'/>Tuesday</label>
              <label className='chkbxlbl' htmlFor='Wednesday'><input className='repeat' type='checkbox' name='Wednesday'/>Wednesday</label>
              <label className='chkbxlbl' htmlFor='Thursday'><input className='repeat' type='checkbox' name='Thursday'/>Thursday</label>
              <label className='chkbxlbl' htmlFor='Friday'><input className='repeat' type='checkbox' name='Friday'/>Friday</label>
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='exclude'>Exclude Date: </label>
              <input className='dateInput' type='date' placeholder='Exclude: mm/dd/yyyy' name='exclude'/>
              <button className='exclude-button' className='pure-button pure-button-primary'>Exclude</button>
              <label className='datelbl' name='excludeDates' value={this.state.excludeDates}>{this.state.excludeDates}</label>
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='description'>Description: </label>
              <input className='dateInput' id='description' type='text' placeholder='Class description...' name='description'/>
              <label className='datelbl' htmlFor='location'>Location: </label>
              <input className='dateInput' id='location' type='text' placeholder='Class location...' name='location'/>
              <label className='datelbl' htmlFor='summary'>Summary: </label>
              <input className='dateInput' id='summary' type='text' placeholder='Class summary...' name='summary'/>
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
