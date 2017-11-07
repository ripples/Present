import React, { Component } from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import Application from './Application.js';
import LecturesList from './app/Pages/LectureList/LecturesList';
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
      <Router history={hashHistory}>
        <Route path="/" component={Application}>
          <IndexRoute component={() => <LecturesList courseId={this.state.data.lis_course_section_sourcedid} course={this.state.course}/>} />
          <Route path="course/:courseId/lecture/:lectureId" component={Lecture} />
          <Route path="calendar" component={() => <Calendar courseId={this.state.data.lis_course_section_sourcedid}/>} />
          <Route path="course/:courseId/instructorSettings" component={() => <InstructorSettings courseId={this.state.data.lis_course_section_sourcedid}/>} />
        </Route>
      </Router>
    );
  }
}
