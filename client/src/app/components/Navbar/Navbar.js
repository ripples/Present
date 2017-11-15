import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';

class Navbar extends Component {

    render(){

        return(
            <div className="navbar navbar-fixed-top navbar-default" style={barStyle}>
                <div className="container-fluid">
                    <div className="col-md-4">
                        <Link to="/">
                            <button style={buttonStyle}>
                                <h1 style={headerStyle}>Lecture Viewer 2</h1>
                            </button>
                        </Link>
                    </div>
                    <div className="col-md-5" >
                    </div>
                    <div className="col-md-3">
                    {
                        ((typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                            <Link to={"/course/" + this.props.courseId + "/instructorSettings"}>
                                <button style={instructorButtonStyle}>Settings &#9881;</button>
                            </Link>
                            : null )
                    }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        courseId: state.token.lis_course_section_sourcedid,
        roles: state.token.roles
    };
};

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
    marginBottom: "10px"
}

var headerStyle= {
    fontWeight: "bold",
    color: "white"
}

var instructorButtonStyle= {
    fontWeight: "bold",
    color: "white",
    marginTop: "24px",
    fontSize: "25px",
    backgroundColor: "#0074D9",
    border: "none",
    outline: "none"
}

export default connect(mapStateToProps)(Navbar);