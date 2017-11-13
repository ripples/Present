import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';

class Navbar extends Component {

	constructor(props){
		super(props)
		this.state = {courseId: "TEMP_COURSE"}
	}

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
                    {
                        ((typeof(this.props.roles) !== "undefined" && this.props.roles.toLowerCase().includes("instructor")) ?
                            <Link to={"/course/" + this.props.courseId + "/instructorSettings"}>
                                <button style={buttonStyle}>Instructor Settings</button>
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

export default connect(mapStateToProps)(Navbar);