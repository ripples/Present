import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';

class Navbar extends Component {

    render(){
        return(
            <div className="navbar navbar-fixed-top navbar-default" style={barStyle}>
                <div className="container-fluid">
                    <div className = "row">
                        <div className="col-md-12">
                            <div className = "pull-left">
                                <Link to="/">
                                    <button style={buttonStyle}>Lecture Viewer 2</button>
                                </Link>
                            </div>
                            <div className = "pull-right">
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
    fontWeight: "bold",
    color: "white",
    fontSize: "38px",
    backgroundColor: "#0074D9",
    border: "none",
    outline: "none"
}

var headerStyle= {
    fontWeight: "bold",
    color: "white"
}

var instructorButtonStyle= {
    fontWeight: "bold",
    color: "white",
    fontSize: "25px",
    backgroundColor: "#0074D9",
    border: "none",
    outline: "none",
    marginTop: "11px"
}

export default connect(mapStateToProps)(Navbar);