import React, { Component } from 'react';
import LectureMedia from "./app/components/LectureMedia/LectureMedia";
import logo from './logo.svg';
import './App.css';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import ReactDOM from 'react-dom';
import Application from './Application.js';
import LecturesList from './Pages/LecturesList.js';


export default class App extends Component {
  render(){
    return(
      <Router history={hashHistory}>
        <Route path="/" component={Application}>
          <IndexRoute component={LecturesList} />
          <Route path="Lecture" component={LecturesList} />
        </Route>
      </Router>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)