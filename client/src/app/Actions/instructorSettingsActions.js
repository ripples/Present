import {instructorSettingsConstants} from '../Constants/actions';

export function setInstructorPage(page) {
    return {
        type: instructorSettingsConstants.SET_INSTRUCTOR_PAGE,
        page
    }
}

export function clearInstructorPage() {
    return {
        type: instructorSettingsConstants.CLEAR_INSTRUCTOR_PAGE
    }
}