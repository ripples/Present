import React, { Component } from 'react';
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
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <h1>Users</h1>
        {this.state.data}
      </div>
    );
  }
}

export default App;
