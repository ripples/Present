import React, { Component } from 'react';
import Lecture from './app/Pages/Lecture/Lecture';
import logo from './logo.svg';
import './App.css';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Application from './Application.js';
import LecturesList from './app/Pages/LectureList/LecturesList';


export default class App extends Component {
  render(){
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Application}>
          <IndexRoute component={LecturesList} />
          <Route path="LectureList" component={LecturesList} />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)