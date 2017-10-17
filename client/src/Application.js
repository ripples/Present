import React, { Component } from 'react';
import './App.css';
import Navbar from './app/components/Navbar/Navbar.js';

export default class Application extends Component {

  render() {
    return (
      <div className="App">
        <Navbar />
        {
            this.props.children
        }
      </div>
    );
  }
}