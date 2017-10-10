import React, { Component } from 'react';
import LectureMedia from "./app/components/LectureMedia/LectureMedia";
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {data: "yo"}

  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(data => 
        {
          console.log(data);
          this.setState(data);
        });
  }

  render() {
    const course = this.props.course;
    return (
      <div className="lecture">
        <div className="lecture-header">
          <h1>
            {this.props.course.name}
          </h1>
        </div>
        <div className="lecture-body">
          <LectureMedia
            lecture = {this.props.lecture}
            media = {this.props.media}
            semester = {course.semester}
            courseId = {course.id}
          />
        </div>
      </div>
    );
  }
}

export default App;
