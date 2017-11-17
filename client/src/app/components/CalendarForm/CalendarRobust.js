import React from 'react';
import moment from 'moment';
import BigCalendar from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
//import events from './events';
import {connect} from "react-redux";
import {setCalEvents,
  setCalSDate,
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

BigCalendar.momentLocalizer(moment);

class CalendarRobust extends React.Component {

  constructor(props){
    super(props);
  }

  componentWillMount(){
    //Read any existing calendar file from server, if none exists, blank calendar. (GET)
    this.props.setCourseId(this.props.courseId);
    fetch(('/api/calendar/' + this.props.courseId), {
      credentials: 'same-origin' // or 'include'
    }).then(
      res => (res.status === 200 || res.status === 204) ? res.json() : []
    ).then((json) => this.props.setCalEvents(json)).catch((err) => console.log(err)); //TODO: On JSON response, set state of current event array to the JSON response via redux and re-render the calendar to reflect it.
  }

  componentWillUnmount(){
    this.props.clearForm();
  }

  render() {

    return (
      <div>
        <BigCalendar
          selectable
          events={this.props.calendarForm.events}
          defaultView='month'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date()}
          onSelectEvent={event => alert(event.start)}
          onSelectSlot={(slotInfo) => alert(
            `selected slot: \n\nstart ${slotInfo.start.toLocaleString()} ` +
            `\nend: ${slotInfo.end.toLocaleString()}` +
            `\naction: ${slotInfo.action}`
          )}
        />
      </div>
    );
  }

}

const mapStateToProps = state => {

	return {
    events: state.events,
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
    setCalLoc: (loc) => dispatch(setCalLoc(loc)),
    setCalEvents: (events) => dispatch(setCalEvents(events))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(CalendarRobust);
