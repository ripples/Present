import {combineReducers} from 'redux';

import token from './token.js';
import courseFiles from './courseFiles.js';
import lectureManifest from './lectureManifest.js';
import lectureTime from './lectureTime.js';
import calendarForm from './calendarForm.js';
import deleteLecture from './lectureDelete.js';
import lectureUpload from './lectureUpload.js';

const appReducer = combineReducers({
    token,
    courseFiles,
    lectureManifest,
    lectureTime,
    calendarForm,
    deleteLecture,
    lectureUpload
});

export default appReducer;
