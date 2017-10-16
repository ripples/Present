import React, { Component } from 'react';
import './App.css';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Application from './Application.js';
import LecturesList from './app/Pages/LectureList/LecturesList';
import Lecture from './app/Pages/Lecture/Lecture.js';


export default class App extends Component {
  
  state = {data: {}}

  setData(data) {
    this.setState(data);
  }

  render(){
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Application}>
          <IndexRoute component={() => <LecturesList courseId = "666"/>} />
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