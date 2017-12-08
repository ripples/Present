import React, { Component } from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import {createStore, applyMiddleware, compose} from "redux";
import {Provider} from "react-redux";
import thunkMiddleware from "redux-thunk";

import appReducer from './app/Reducers/reducer.js'; 
import {setToken} from './app/Actions/tokenActions.js';
import {setCourseFiles} from './app/Actions/courseFilesActions.js';

import Application from './Application.js';
import LecturesList from './app/Pages/LecturesList/LecturesList';
import Lecture from './app/Pages/Lecture/Lecture.js';
import InstructorSettings from './app/Pages/InstructorSettings/InstructorSettings.js';


export default class App extends Component {

  constructor(props) {
    super(props);

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
    fetch(('/api/identify/'), {
      credentials: 'same-origin' // or 'include'
    }).then(
      res => (res.status < 400) ? res.json() : Promise.reject('bad identify')
    ).then(
      token =>
      {
        fetch(('/api/listofCourseLectures/'), {
          credentials: 'same-origin'
		  }).then(res => res.json()).then(course => {
        this.store.dispatch(setToken(token));
        this.store.dispatch(setCourseFiles(course));
        });
      }
    ).catch( err => console.log(err));
  }

  render() {
    return (
      <Provider store={this.store}>
        <Router history={hashHistory}>
          <Route path="/" component={Application}>
            <IndexRoute component={LecturesList} />
            <Route path="course/:courseId/lecture/:lectureId" component={Lecture} />
              <Route path="course/:courseId/instructorSettings" >
                <IndexRoute component={InstructorSettings} />
              </Route>
          </Route>
        </Router>
      </Provider>
    );
  }
}
