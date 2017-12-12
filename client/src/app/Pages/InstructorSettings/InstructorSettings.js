import React, { Component } from 'react';
import {connect} from "react-redux";
import CalendarRobust from '../../components/CalendarForm/CalendarRobust';
import LectureUpload from '../../components/LectureUpload/LectureUpload';
import LectureDelete from '../../components/LectureDelete/LectureDelete';
import {setInstructorPage, clearInstructorPage} from '../../Actions/instructorSettingsActions.js';

class InstructorSettings extends Component {

    componentWillMount() {
        this.props.setInstructorPage("lectureUpload");
    }

    onClick(page) {
        this.props.setInstructorPage(page);
    }

    renderComponent(page) {
        switch(page) {
            case "calendar":
                return <CalendarRobust />
            case "lectureUpload":
                return <LectureUpload />
            case "lectureDelete":
                return <LectureDelete />
            default:
                return <div />
        }
    }

    componentWillUnmount() {
        this.props.clearInstructorPage();
    }

    render(){

        return(
            <div className="container-fluid">
                { ((typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                <div className="row" >
                    <div className="col-md-12">
                        <h1 style = {headerStyle} >Settings</h1>
                        <div className="col-md-4">
                            <div>
                                <button style={buttonStyle} onClick={this.onClick.bind(this, "lectureUpload")}><div style = {textStyle}>Lecture Upload</div></button>
                            </div>
                            <div>
                                <button style={buttonStyle} onClick={this.onClick.bind(this, "lectureDelete")}><div style = {textStyle}>Lecture Delete</div></button>
                            </div>
                            <div>
                                <button style={buttonStyle} onClick={this.onClick.bind(this, "calendar")}><div style = {textStyle}>Calendar</div></button>
                            </div>
                        </div>
                        <div className="col-md-8" >
                            {this.renderComponent(this.props.instructorPage)}
                        </div>
                    </div>
                </div>
                :
                <div>
                    <h3>You are not an instructor for this course.</h3>
                </div>
                )
            }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        courseId: state.token.lis_course_section_sourcedid,
        instructorPage: state.instructorPage.page,
        roles: state.token.roles,
        ipage: state.instructorPage
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setInstructorPage: (page) => dispatch(setInstructorPage(page)),
        clearInstructorPage: () => dispatch(clearInstructorPage())
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(InstructorSettings);