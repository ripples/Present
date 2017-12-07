import {instructorSettingsConstants} from '../Constants/actions';

export default function instructorPage(state = initialState, action) {
    switch(action.type) {
        case instructorSettingsConstants.SET_INSTRUCTOR_PAGE:
            return {
                page: action.page,
                status: state.status
            };
        
        case instructorSettingsConstants.CLEAR_INSTRUCTOR_PAGE:
            return {
                page: "",
                status: ""
            };
        
        case instructorSettingsConstants.SET_STATUS_MESSAGE:
            return {
                page: state.page,
                status: action.status
            };
        
        case instructorSettingsConstants.CLEAR_STATUS_MESSAGE:
            return {
                page: state.page,
                status: ""
            };
            
        default:
            return state;
    }
}

var initialState = {
    page: "",
    status: ""
}