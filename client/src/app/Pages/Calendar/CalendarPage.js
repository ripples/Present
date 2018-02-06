import React, { Component } from 'react';
import {connect} from "react-redux";
import Calendar from '../../components/CalendarForm/Calendar';

class CalendarPage extends Component {

    render(){
        return(
            <div>
                {
                    (typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                        <Calendar />
                    :
                        <div>
                            <h3>You are not an instructor for this course</h3>
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        courseId: state.token.lis_course_section_sourcedid,
        roles: state.token.roles
    };
};

export default connect(mapStateToProps)(CalendarPage);
