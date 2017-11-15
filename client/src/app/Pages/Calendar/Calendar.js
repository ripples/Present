import React, { Component } from 'react';
import {connect} from "react-redux";
import CalendarForm from '../../components/CalendarForm/CalendarForm';

class Calendar extends Component {

    render(){
        return(
            <div>
                <CalendarForm courseId={this.props.courseId}/>
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