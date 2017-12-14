import {instructorSettingsConstants} from '../Constants/actions';

export default function instructorPage(state = initialState, action) {
    switch(action.type) {
        case instructorSettingsConstants.SET_INSTRUCTOR_PAGE:
            return {
                page: action.page,
                status: state.status,
                modalState: state.modalState,
                roomOptions: state.roomOptions,
            };

        case instructorSettingsConstants.CLEAR_INSTRUCTOR_PAGE:
            return {
                page: "",
                status: "",
                modalState: false,
                roomOptions: []
            };

        case instructorSettingsConstants.SET_STATUS_MESSAGE:
            return {
                page: state.page,
                status: action.status,
                modalState: state.modalState,
                roomOptions: state.roomOptions
            };

        case instructorSettingsConstants.CLEAR_STATUS_MESSAGE:
            return {
                page: state.page,
                status: "",
                modalState: state.modalState,
                roomOptions: state.roomOptions
            };

        case instructorSettingsConstants.SET_ROOM_MODAL_STATE:
          return {
            path: state.page,
            status: state.status,
            modalState: action.modalState,
            roomOptions: state.roomOptions
          };

        case instructorSettingsConstants.SET_ROOM_OPTIONS:
          return {
            path: state.page,
            status: state.status,
            modalState: state.modalState,
            roomOptions: action.roomOptions
          };

        default:
            return state;
    }
}

var initialState = {
    page: "",
    status: "",
    modalState: false,
    roomOptions: []
}
