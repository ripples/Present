import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
    
    render(){
        return(
            <div className="navbar navbar-fixed-top navbar-default" style={barStyle}>
                <div className="container-fluid"> 
                    <div className="col-md-3">
                        <Link to="/">
                            <button style={buttonStyle}>
                                <h1 style={headerStyle}>Lecture Viewer 2</h1>
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-6" >
                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
            </div>
        );
    }
}

var barStyle = {
    backgroundColor: "#0074D9",
    color: "white"
}

var buttonStyle= {
    backgroundColor: "#0074D9",
    border: "none",
    outline: "none",
    fontWeight: "bold",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingBottom: "6px"
}

var headerStyle= {
    fontWeight: "bold",
    color: "white"
}