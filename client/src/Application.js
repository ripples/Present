import React, { Component } from 'react';
import Navbar from './app/components/Navbar/Navbar.js';
import ModalConductor from './app/components/Modals/ModalConductor.js';

export default class Application extends Component {

  render() {
    return (
      <div style={app}>
        <Navbar />
        {
            this.props.children
        }
        <ModalConductor />
      </div>
    );
  }
}

var app = {
  textAlign: "center"
}
