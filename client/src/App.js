import React, { Component } from 'react';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Application from './Application.js';
import LecturesList from './app/Pages/LectureList/LecturesList';
import Lecture from './app/Pages/Lecture/Lecture.js';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: {}
    };
  }

  componentDidMount() {
    fetch(('/identify/' + window.location.pathname.substr(1))).then(
      res => (res.status === 200) ? res.json() : ""
    ).then(
      dat => 
      {
        console.log(dat)
        this.setState({data: dat})
      }
    );
  }

  render() {   
    return (
      <Router history={hashHistory}>
        <Route path="/" component={Application}>
          <IndexRoute component={() => <LecturesList courseId={this.state.data.lis_course_section_sourcedid}/>} />
          <Route path="course/:courseId/lecture/:lectureId" component={Lecture} />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)