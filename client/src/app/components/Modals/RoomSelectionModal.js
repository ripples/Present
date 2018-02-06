import React from 'react';
import Select from 'react-select';
import ModalWrapper from './ModalWrapper.js';
import {connect} from 'react-redux';
import {showModal, hideModal} from '../../Actions/modalActions.js';
import {setCalRoom, setCalURL, setCalOriginalCal, setCalEvents, setCalHexColor, setCalCourseId} from '../../Actions/calFormActions.js';
import {setRoomModalState, setRoomOptions, setInstructorPage} from '../../Actions/instructorSettingsActions.js';
import {generateRandomHexColor, deepCopy, processEvents} from '../CalendarForm/CalendarUtils.js';

class RoomSelectionModal extends React.Component {
  constructor(props){
    super(props);
  }

  loadCalendarData = () => {
    this.props.setCourseId(this.props.courseId);
    fetch(('/api/calendar/populate/' + encodeURIComponent("./lectures/" + this.props.calendarForm.room + "/Calendar.ics")), {
      credentials: 'same-origin' // or 'include'
    }).then(
      res => (res.status === 200 || res.status === 204 || res.status === 304) ? res.json() : []
    ).then((json) => {
      if(json.length !== 0){ //If there was no valid calendar file
        const calendar = processEvents(json);
        this.props.setCalOriginalCal(calendar);
        this.props.setCalEvents(deepCopy(calendar));
        this.props.setCalHexColor(calendar[0].hexColor);
      }
      else{
        this.props.setCalOriginalCal([]);
        this.props.setCalEvents([]);
        this.props.setCalHexColor(generateRandomHexColor());
      }
    }).catch((err) => console.log(err));
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

  onClose = () => {
    if(this.props.room !== "" && this.props.room !== "MODAL"){
      this.loadCalendarData();
      this.props.hideModal();
      this.props.setInstructorPage("calendar");
    }
  }

  cancelSelection = () => {
    this.props.hideModal();
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

  handleRoomSelect(e){
    if(!e){
      this.props.setCalRoom("MODAL");
    }
    else{
      this.props.setCalRoom(e.value);
      this.props.setCalURL(this.getCorrectURL(e.value));
    }
  }

  render() {

    const options = this.populateDropdown();
    let isDisabled = (this.props.room === "" || this.props.room === "MODAL");
    let style = modalBtnStyle;
    if(isDisabled){
      style = disabledButtonStyle;
    }

    const roomSelectionForm = (
      <form id='roomSelectForm'>
        <div>
          <Select name="roomSelectionDD" style={selectStyle} value={this.props.room} onChange={this.handleRoomSelect.bind(this)} options={options} />
        </div>
      </form>
    );

    const buttons = (
      <span>
        <button type="button" style={style} onClick={this.onClose} disabled={isDisabled}>Okay</button>
      </span>
    );

    return (
      <ModalWrapper title="Select a Classroom" body={roomSelectionForm} footerBtns={buttons} hideModal={this.cancelSelection} closeText="Cancel" closeStyle={modalBtnStyle}/>
    );
  }
}

var headerStyle= {
	fontWeight: "bold",
    fontSize: "36px",
    marginBottom: "40px"
}

var selectStyle = {
  margin: '10px 0px 10px 0px'
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

const mapStateToProps = state => {
  return {
    modal: state.modal,
    ipage: state.instructorPage,
    room: state.calendarForm.room,
    url: state.calendarForm.url,
    courseId: state.token.lis_course_section_sourcedid,
    calendarForm: state.calendarForm
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
    setInstructorPage: (page) => dispatch(setInstructorPage(page)),
    showModal: (modal) => dispatch(showModal(modal)),
    hideModal: () => dispatch(hideModal()),
    setRoomModalState: (modalState) => dispatch(setRoomModalState(modalState)),
    setCalRoom: (room) => dispatch(setCalRoom(room)),
    setCalURL: (url) => dispatch(setCalURL(url)),
    setRoomOptions: (roomOptions) => dispatch(setRoomOptions(roomOptions)),
    setCourseId: (courseId) => dispatch(setCalCourseId(courseId)),
    setCalOriginalCal: (originalCal) => dispatch(setCalOriginalCal(originalCal)),
    setCalEvents: (events) => dispatch(setCalEvents(events)),
    setCalHexColor: (hexColor) => dispatch(setCalHexColor(hexColor))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(RoomSelectionModal);
