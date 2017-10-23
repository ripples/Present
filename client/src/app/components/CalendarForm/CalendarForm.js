import React from 'react';
import './CalendarForm.css'

class CalendarForm extends React.Component {

  constructor(props){
    super(props);
    this.state ={
      startDate: "",
      endDate: "",
      repeatDays: [false, false, false, false, false],
      excludeDates: [],
      result: "Results"
    };
  }

  render() {
    return (
      <div className='calForm'>
        <form className='pure-form'>
          <fieldset>
            <legend>New Recording Schedule</legend>
            <div className='input_block'>
              <label className='datelbl' htmlFor='start'>Start Date: </label>
              <input className='dateInput' id='startDate' type='date' placeholder='Start Date: mm/dd/yyyy hh:mm' name='start' />
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='begin'>Start Time: </label>
              <input className='dateInput' id='begin' type='time' placeholder='Start Time: hh:mm AM/PM' name='begin'/>
              <label className='datelbl' htmlFor='endTime'>End Time: </label>
              <input className='dateInput' id='endTime' type='time' placeholder='End Time: hh:mm AM/PM' name='endTime'/>
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='end'>End Date: </label>
              <input className='dateInput' id='endDate' type='date' placeholder='End Date: mm/dd/yyyy' name='end'/>
            </div>
            <div className='input_block'>
              <p>Repeat (WEEKLY): </p>
              <input className='repeat' type='checkbox' name='M'/><label className='chkbxlbl' htmlFor='M'>M</label>
              <input className='repeat' type='checkbox' name='Tu'/><label className='chkbxlbl' htmlFor='Tu'>Tu</label>
              <input className='repeat' type='checkbox' name='W'/><label className='chkbxlbl' htmlFor='W'>W</label>
              <input className='repeat' type='checkbox' name='Th'/><label className='chkbxlbl' htmlFor='Th'>Th</label>
              <input className='repeat' type='checkbox' name='F'/><label className='chkbxlbl' htmlFor='F'>F</label>
            </div>
            <div className='input_block'>
              <label className='datelbl' htmlFor='exclude'>Exclude Date: </label>
              <input className='dateInput' type='date' placeholder='Exclude: mm/dd/yyyy' name='exclude'/>
              <button className='exclude-button' type='submit' className='pure-button pure-button-primary'>Exclude</button>
            </div>
            <div className='input_block'>
              <button type='submit' className='pure-button pure-button-primary'>Create</button>
            </div>
            <div className='input_block'>
              <label id='results'></label>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default CalendarForm;
