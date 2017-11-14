import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';

class InstructorSettings extends Component {

    render(){

        return(
            <div className="container-fluid">
                <div className="col-md-2">
                </div>
                <div className="col-md-8">
                    <h1>Settings</h1>
                    <Link to="/calendar">
                      <button style={buttonStyle}>Calendar</button>
                    </Link>
                </div>
                <div className="col-md-2">
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        courseId: state.token.lis_course_section_sourcedid
    };
};

var buttonStyle= {
    backgroundColor: "white",
    borderRadius: "4px",
    marginTop: "20px",
    color: "#000080",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "4px",
    paddingBottom: "4px"
}

export default connect(mapStateToProps)(InstructorSettings);