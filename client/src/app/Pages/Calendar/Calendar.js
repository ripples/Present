import React, { Component } from 'react';
import {connect} from "react-redux";
import CalendarForm from '../../components/CalendarForm/CalendarForm';
import CalendarRobust from '../../components/CalendarForm/CalendarRobust';

class Calendar extends Component {

    render(){
        return(
            <div>
                <CalendarRobust />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        courseId: state.token.lis_course_section_sourcedid
    };
};

export default connect(mapStateToProps)(Calendar);
