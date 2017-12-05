import {instructorSettingsConstants} from '../Constants/actions';

export default function instructorPage(state = initialState, action) {
    switch(action.type) {
        case instructorSettingsConstants.SET_INSTRUCTOR_PAGE:
            return {
                page: action.page
            };
        
        case instructorSettingsConstants.CLEAR_INSTRUCTOR_PAGE:
            return {
                page: ""
            };
        
        default:
            return state;
    }
}

var initialState = {
    page: ""
}