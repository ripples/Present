import React, { Component } from 'react';
import { Link } from 'react-router';

export default class InstructorSettings extends Component {

    render(){

        return(
            <div className="container-fluid">
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                    <h1>Settings</h1>
                    <p>Various instructor settings will go here.
                        The first will be the scheduling component once that is completed.
                        There are currently issues with this as it needs props to be sent to the navbar, but that is causing problems.
                        The props are needed so the button only shows for certain people, and so the course can be identified.
                        This should be removed once these issues are fixed.
                    </p>
                </div>
                <div className="col-md-2">
                </div>
            </div>
        );
    }
}