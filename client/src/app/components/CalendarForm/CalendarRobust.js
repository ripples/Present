import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import {connect} from "react-redux";

BigCalendar.momentLocalizer(moment);

class CalendarRobust extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    //Read any existing calendar file from server, if none exists, blank calendar. (GET)
    fetch(('/api/calendar/' + this.props.courseId), {
      credentials: 'same-origin' // or 'include'
    }).then(
      res => (res.status === 200 || res.status === 204) ? res.json() : []
    ).then((json) => console.log(json)).catch((err) => console.log(err)); //TODO: On JSON response, set state of current event array to the JSON response via redux and re-render the calendar to reflect it.
  }

  componentWillUnmount(){
    //this.props.clearForm();
  }

  render() {

    return (
      <div>
        <BigCalendar
          selectable
          events={events}
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
    courseId: state.token.lis_course_section_sourcedid
	};
};

export default connect(mapStateToProps)(CalendarRobust);
