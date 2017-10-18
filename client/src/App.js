import React, { Component } from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Application from './Application.js';
import LecturesList from './app/Pages/LectureList/LecturesList';
import Lecture from './app/Pages/Lecture/Lecture.js';
import Calendar from './app/Pages/Calendar/Calendar.js'


export default class App extends Component {

  constructor(props) {
      super(props);
       this.state = {
        data: {}
       };
      }

       componentDidMount() {
                 fetch('/data').then(res => res.json()).then(dat => {
           this.setState({data: dat})
       })
    }

  render(){
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Application}>
          <IndexRoute component={() => <LecturesList courseId = {this.state.data.lis_course_section_sourcedid}/>} />
          <Route path="course/:courseId/lecture/:lectureId" component={Lecture} />
          <Route path="calendar" component={Calendar} />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
