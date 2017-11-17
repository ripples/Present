import React from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import events from './events';
import 'react-big-calendar/lib/css/react-big-calendar.css';

BigCalendar.momentLocalizer(moment);

class CalendarRobust extends React.Component {

  constructor(props){
    super(props);
  }

  componentDidMount(){
    //Read any existing calendar file from server, if none exists, blank calendar. (GET)
    fetch(('/api/calendar'), {
      credentials: 'same-origin' // or 'include'
    }).then(
      res => (res.status === 200 || res.status === 204) ? res.json() : []
    ).then((json) => console.log(json)).catch((err) => console.log(err));
  }

  componentWillUnmount(){
    //this.props.clearForm();
  }

  render() {
    //var date = new Date(year, month, day, hours, minutes, seconds, milliseconds);

    return (
      <div>
        <BigCalendar
          selectable
          events={events}
          defaultView='month'
          scrollToTime={new Date(1970, 1, 1, 6)}
          defaultDate={new Date(2015, 3, 12)}
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

export default CalendarRobust;
