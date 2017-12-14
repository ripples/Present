import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import CalendarRobust from '../../components/CalendarForm/CalendarRobust';
import LectureUpload from '../../components/LectureUpload/LectureUpload';
import LectureDelete from '../../components/LectureDelete/LectureDelete';
import {setInstructorPage, clearInstructorPage, setRoomModalState, setRoomOptions} from '../../Actions/instructorSettingsActions.js';
import {setCalRoom, setCalURL} from '../../Actions/calFormActions.js';

class InstructorSettings extends Component {

    componentWillMount() {
        this.props.setInstructorPage(this.props.instructorPage);
        fetch(('/api/calendar/recent'), {
          credentials: 'same-origin' // or 'include'
        }).then(res => (res.status === 200 || res.status === 204 || res.status === 304) ? res.json() : -1
      ).then((json) => {
        let valid_Cal_Room = json[0];
        if(valid_Cal_Room === ""){
          this.props.setCalRoom("MODAL");
        }
        else{
          this.props.setCalRoom(valid_Cal_Room);
        }
        json.splice(0, 1);
        this.props.setRoomOptions(json);
      }).catch((err) => console.log(err));
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

    onOpenModal = () => {
      if(this.props.room === "MODAL" && this.props.modalState === false){
        this.props.setRoomModalState(true); //Causes "cannot update during existing state transition" warning
      }
      else if(this.props.room !== "MODAL" && this.props.room !== "" && this.props.modalState === false){
        this.props.setInstructorPage("calendar");
      }
    };

    onCloseModal = () => {
      if(this.props.room !== "" && this.props.room !== "MODAL"){
        this.props.setRoomModalState(false);
        this.props.setInstructorPage("calendar");
      }
    };

    populateDropdown = () => {
      let items = [];
      for(var i = 0; i < this.props.ipage.roomOptions.length; i++){
        let item = {}
        item.value = this.props.ipage.roomOptions[i].split("-URL-")[0];
        item.label = this.props.ipage.roomOptions[i].split("-URL-")[0];
        items.push(item);
      }
      return items;
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

    cancelRoomSelect(e){
      e.preventDefault();
      this.props.setRoomModalState(false);
    }

    handleRoomSelect(e){
      if(e === null){
        this.props.setCalRoom("MODAL");
      }
      else{
        this.props.setCalRoom(e.value);
        this.props.setCalURL(this.getCorrectURL(e.value));
      }
    }

    render(){
      const options = this.populateDropdown();
      let isDisabled = (this.props.room === "" || this.props.room === "MODAL");
      let style = modalBtnStyle;
      if(isDisabled){
        style = disabledButtonStyle;
      }

      const roomSelectionForm = (
        <form id='roomSelectForm'>
          <div>
            <h3 style={headerStyle}>Select a Classroom</h3>
          </div>
          <div>
            <Select name="roomSelectionDD" style={selectStyle} value={this.props.room} onChange={this.handleRoomSelect.bind(this)} options={options} />
          </div>
          <div style={{textAlign: 'center'}}>
            <button type="button" style={style} onClick={this.onCloseModal} disabled={isDisabled}>Okay</button>
            <button type="button" style={modalBtnStyle} onClick={this.cancelRoomSelect.bind(this)}>Cancel</button>
          </div>
        </form>
      );

        return(
            <div className="container-fluid">
                { ((typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                <div className="row" >
                    <div className="col-md-12">
                        <h1 style = {headerStyle} >Settings</h1>
                        <div className="col-md-4">
                            <Modal open={this.props.modalState} onClose={this.onCloseModal} showCloseIcon={false} little>
                              {roomSelectionForm}
                            </Modal>
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
        url: state.calendarForm.url
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setInstructorPage: (page) => dispatch(setInstructorPage(page)),
        clearInstructorPage: () => dispatch(clearInstructorPage()),
        setRoomModalState: (modalState) => dispatch(setRoomModalState(modalState)),
        setCalRoom: (room) => dispatch(setCalRoom(room)),
        setCalURL: (url) => dispatch(setCalURL(url)),
        setRoomOptions: (roomOptions) => dispatch(setRoomOptions(roomOptions))
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

var disabledButtonStyle = {
  display: 'inline',
  margin: '10px 5px 10px 5px',
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "4px",
  paddingBottom: "4px",
  backgroundColor: "grey",
  borderRadius: "4px",
  color: "#00008"
}

var modalBtnStyle = {
  display: 'inline',
  margin: '10px 5px 10px 5px',
  paddingLeft: "10px",
  paddingRight: "10px",
  paddingTop: "4px",
  paddingBottom: "4px",
  backgroundColor: "white",
  borderRadius: "4px",
  color: "#000080"
}

var selectStyle = {
  margin: '10px 0px 10px 0px'
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
