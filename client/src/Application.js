import React, { Component } from 'react';
import Navbar from './app/components/Navbar/Navbar.js';

export default class Application extends Component {

  render() {
    return (
      <div style={app}>
        <Navbar />
        {
            this.props.children
        }
      </div>
    );
  }
}

var app = {
  textAlign: "center"
}