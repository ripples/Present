import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Lecture from './app/Pages/Lecture/Lecture';

export default class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: "yo",
      stuff: {}
    };
  }

  componentDidMount() {
    fetch('/data')
      .then(res => res.json())
      .then(data => 
        {
          console.log(data);
          this.setState({stuff: data});
        });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Users</h1>
        {this.state.data}
        {
            this.props.children
        }
        <Lecture data={this.state.stuff} />
      </div>
    );
  }
}