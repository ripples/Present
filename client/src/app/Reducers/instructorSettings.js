import {instructorSettingsConstants} from '../Constants/actions';

export default function instructorPage(state = initialState, action) {
    switch(action.type) {
        case instructorSettingsConstants.SET_INSTRUCTOR_PAGE:
            return {
                page: action.page,
                status: state.status,
                fpath: state.fpath
            };

        case instructorSettingsConstants.CLEAR_INSTRUCTOR_PAGE:
            return {
                page: "",
                status: "",
                fpath: ""
            };

        case instructorSettingsConstants.SET_STATUS_MESSAGE:
            return {
                page: state.page,
                status: action.status,
                fpath: state.fpath
            };

        case instructorSettingsConstants.CLEAR_STATUS_MESSAGE:
            return {
                page: state.page,
                status: "",
                fpath: state.fpath
            };

        case instructorSettingsConstants.SET_CAL_FPATH:
          return {
            path: state.page,
            status: state.status,
            fpath: action.fpath
          };

        default:
            return state;
    }
}

var initialState = {
    page: "",
    status: "",
    fpath: ""
}
