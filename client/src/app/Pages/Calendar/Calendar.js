import React, { Component } from 'react';
import CalendarForm from '../../components/CalendarForm/CalendarForm';

export default class Calendar extends Component {

    render(){
        return(
            <div>
                <CalendarForm courseId={this.props.courseId}/>
            </div>
        );
    }
}
