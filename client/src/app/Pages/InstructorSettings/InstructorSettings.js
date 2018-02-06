import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';
import 'react-select/dist/react-select.css';
import Calendar from '../../components/CalendarForm/Calendar';
import LectureUpload from '../../components/LectureUpload/LectureUpload';
import LectureDelete from '../../components/LectureDelete/LectureDelete';
import {setInstructorPage, clearInstructorPage, setRoomOptions} from '../../Actions/instructorSettingsActions.js';
import {setCalRoom, setCalURL} from '../../Actions/calFormActions.js';
import {showModal} from '../../Actions/modalActions.js';

class InstructorSettings extends Component {

    componentWillMount() {
        this.props.setInstructorPage(this.props.instructorPage);
        fetch(('/api/calendar/recent'), {
          credentials: 'same-origin' // or 'include'
        }).then(res => (res.status === 200 || res.status === 204 || res.status === 304) ? res.json() : -1
      ).then((json) => {
        let valid_Cal_Room = json[0];
        json.splice(0, 1);
        this.props.setRoomOptions(json);
        if(valid_Cal_Room === ""){
          this.props.setCalRoom("MODAL");
        }
        else{
          this.props.setCalRoom(valid_Cal_Room);
          this.props.setCalURL(this.getCorrectURL(valid_Cal_Room));
        }
      }).catch((err) => console.log(err));
    }

    onClick(page) {
        this.props.setInstructorPage(page);
    }

    getCorrectURL = (room) => {
      for(var i = 0; i < this.props.ipage.roomOptions.length; i++){
        let room_url = this.props.ipage.roomOptions[i].split("-URL-");
        if(room === room_url[0]){
          return room_url[1];
        }
      }
      return "";
    };

    renderComponent(page) {
        switch(page) {
            case "calendar":
                return <Calendar />
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

    onOpenModal = () => {
      if(this.props.room === "MODAL" && this.props.modalState === false){
        this.props.showModal('ROOM_SELECT');
      }
      else if(this.props.room !== "MODAL" && this.props.room !== "" && this.props.modalState === false){
        this.props.setInstructorPage("calendar");
      }
    };

    render(){
        return(
            <div className="container-fluid">
                { ((typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                <div className="row" >
                    <div className="col-md-12">
                        <h1 style = {headerStyle} >Settings</h1>
                        <div className="col-md-4">
                            <div>
                              <button style={buttonStyle} onClick={this.onOpenModal}><div style = {textStyle}>Calendar</div></button>
                            </div>
                            <div>
                              <button style={buttonStyle} onClick={this.onClick.bind(this, "lectureUpload")}><div style = {textStyle}>Lecture Upload</div></button>
                            </div>
                            <div>
                              <button style={buttonStyle} onClick={this.onClick.bind(this, "lectureDelete")}><div style = {textStyle}>Lecture Delete</div></button>
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
        ipage: state.instructorPage,
        modalState: state.instructorPage.modalState,
        room: state.calendarForm.room,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setInstructorPage: (page) => dispatch(setInstructorPage(page)),
        clearInstructorPage: () => dispatch(clearInstructorPage()),
        setCalRoom: (room) => dispatch(setCalRoom(room)),
        setCalURL: (url) => dispatch(setCalURL(url)),
        setRoomOptions: (roomOptions) => dispatch(setRoomOptions(roomOptions)),
        showModal: (modal) => dispatch(showModal(modal))
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
