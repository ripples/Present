import React, { Component } from 'react';
import {connect} from "react-redux";
import CalendarRobust from '../../components/CalendarForm/CalendarRobust';
import LectureUpload from '../../components/LectureUpload/LectureUpload';
import LectureDelete from '../../components/LectureDelete/LectureDelete';
import {setInstructorPage, clearInstructorPage} from '../../Actions/instructorSettingsActions.js';
import { slide as Menu} from 'react-burger-menu';

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

    showSettings (event) {
        event.preventDefault();
    }

    render(){

        return(
            <div className="container-fluid">
                { ((typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                <div className="row" >
                    <div className="col-md-12">
                        <Menu noOverlay styles={styles}>
                                <a style={buttonStyle} className="menu-item" onClick={this.onClick.bind(this, "lectureUpload")}><div style = {textStyle}>Lecture Upload</div></a>
                                <a style={buttonStyle} className="menu-item" onClick={this.onClick.bind(this, "lectureDelete")}><div style = {textStyle}>Lecture Delete</div></a>
                                <a style={buttonStyle} className="menu-item" onClick={this.onClick.bind(this, "calendar")}><div style = {textStyle}>Calendar</div></a>
                        </Menu>
                        <div className="col-md-2">
                        </div>
                        <div className="col-md-8" >
                            {this.renderComponent(this.props.instructorPage)}
                        </div>
                        <div className="col-md-2" />
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
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setInstructorPage: (page) => dispatch(setInstructorPage(page)),
        clearInstructorPage: () => dispatch(clearInstructorPage())
    }
};

var buttonStyle= {
    marginTop: "20px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "4px",
    paddingBottom: "4px",
    cursor: "pointer"
}

var headerStyle= {
	fontWeight: "bold",
    fontSize: "36px"
}

var textStyle = {
    fontSize: "20px",
    color: "white"
}

var styles = {
    bmBurgerButton: {
      position: 'fixed',
      width: '40px',
      height: '40px',
      top: '90px'
    },
    bmBurgerBars: {
      background: '#373a47'
    },
    bmCrossButton: {
      height: '24px',
      width: '24px',
    },
    bmCross: {
      background: '#bdc3c7'
    },
    bmMenu: {
      background: '#373a47',
      fontSize: '1.15em',
      height: "100%",
      width: "100%",
    },
    bmMorphShape: {
      fill: '#373a47'
    },
    bmItemList: {
      color: '#b8b7ad',
      padding: '0.8em'
    },
    bmOverlay: {
      background: 'rgba(0, 0, 0, 0.3)'
    }
  }
export default connect(mapStateToProps, mapDispatchToProps)(InstructorSettings);