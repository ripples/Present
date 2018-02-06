import React, { Component } from 'react';
import Navbar from './app/components/Navbar/Navbar.js';
import ModalConductor from './app/components/Modals/ModalConductor.js';
import MessageConductor from './app/components/Messages/MessageConductor.js';

export default class Application extends Component {

  render() {
    return (
      <div style={app}>
        <Navbar />
        {
            this.props.children
        }
        <ModalConductor />
        <MessageConductor />
      </div>
    );
  }
}

var app = {
  textAlign: "center"
}
