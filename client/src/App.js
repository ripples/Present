import React, { Component } from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";

import appReducer from './app/Reducers/reducer.js';
import {setToken, setCourseFiles} from './app/Actions/action.js';

import Application from './Application.js';
import LecturesList from './app/Pages/LecturesList/LecturesList';
import Lecture from './app/Pages/Lecture/Lecture.js';
import Calendar from './app/Pages/Calendar/Calendar.js';
import InstructorSettings from './app/Pages/InstructorSettings/InstructorSettings.js';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      course: {}
    };


    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    this.store = createStore(
      appReducer,
      {},
      composeEnhancers(applyMiddleware(
        thunkMiddleware
      ))
    );
  }
  
  componentDidMount() {
    fetch(('/identify/' + window.location.pathname.substr(1)), {
      credentials: 'same-origin' // or 'include'
    }).then(
      res => (res.status === 200) ? res.json() : ""
    ).then(
      dat =>
      {
        fetch('/listofCourseLectures/' + dat.lis_course_section_sourcedid).then(res => res.json()).then(cour => {
          this.store.dispatch(setToken(dat));
          this.store.dispatch(setCourseFiles(cour));
          this.setState({
            data: dat,
            course: cour
          });
        });
      }
    );
  }

  render() {

    return (
      <Provider store={this.store}>
        <Router history={hashHistory}>
          <Route path="/" component={Application}>
            <IndexRoute component={LecturesList} />
            <Route path="course/:courseId/lecture/:lectureId" component={Lecture} />
            <Route path="calendar" component={Calendar} />
            <Route path="course/:courseId/instructorSettings" component={InstructorSettings} />
          </Route>
        </Router>
      </Provider>
    );
  }
}
