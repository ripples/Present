import React, { Component } from 'react';
import { Link } from 'react-router';

export default class Navbar extends Component {
    
    render(){
        return(
            <div className="navbar navbar-fixed-top navbar-default" style={barStyle}>
                <div className="container-fluid"> 
                    <div className="col-md-3">
                        <Link to="/">
                            <button style={buttonStyle}>Lecture List</button>
                        </Link>
                    </div>
                    <div className="col-md-6" >
                        <h1 style={headerStyle}>Lecture Viewer 2</h1>
                    </div>
                    <div className="col-md-3">
                    </div>
                </div>
            </div>
        );
    }
}

var barStyle = {
    backgroundColor: "#000080",
    color: "white"
}

var buttonStyle= {
    backgroundColor: "white",
    borderRadius: "4px",
    marginTop: "20px",
    color: "#000080",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "4px",
    paddingBottom: "4px"
}

var headerStyle= {
	fontWeight: "bold"
}