import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';

class InstructorSettings extends Component {

    render(){

        return(
            <div className="container-fluid">
                <div className="row" >
                    <div className="col-md-12">
                        <h1 style = {headerStyle} >Settings</h1>
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <div>
                                <Link to="/calendar/">
                                <button style={buttonStyle}><div style = {textStyle}>Calendar</div></button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/lectureUpload/">
                                    <button style={buttonStyle}><div style = {textStyle}>Lecture Upload</div></button>
                                </Link>
                            </div>
                            <div>
                                <Link to="/lectureDelete/">
                                    <button style={buttonStyle}><div style = {textStyle}>Lecture Delete</div></button>
                                </Link>
                            </div>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
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
    color: "black",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "4px",
    paddingBottom: "4px",
    border: "solid black 1px",
    outline: "none"
}

var headerStyle= {
	fontWeight: "bold",
    fontSize: "36px",
    marginBottom: "40px"
}

var textStyle = {
    fontSize: "20px"
}

export default connect(mapStateToProps)(InstructorSettings);