import React, { Component } from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router';
import {convertMonth} from '../../utils/utils.js';

class LecturesList extends Component {

	render() {
		return (
			<div className="container-fluid">
				<div className="row">
				<div className="col-md-12">
					<h2 style={headerStyle}>{this.props.courseTitle} Lectures:</h2>
					{( typeof this.props.course !== "undefined" && typeof this.props.course.children !== "undefined") ?
						this.props.course.children.map((course, i) => {
							var patt = /^\d\d-\d\d-\d\d\d\d--\d\d-\d\d-\d\d$/;
							if (patt.test(course.name)) { 
								return (
									<div className = "col-md-3" style={buttonStyles} key={i}>
										<div style = {courseStyle}>{convertMonth(course.name.substring(0,10)) + course.name.substring(3,5) + ", " + course.name.substring(6,10)}</div>
										<Link to={"course/" + this.props.courseId + "/lecture/" + course.name}>
											<button type="button" style={buttonStyle} />
										</Link>
									</div>
								);
							} else {
								return (<div key={i}></div>)
							}
						}) : null
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
		 course: state.courseFiles,
		 courseTitle: state.token.context_title
	 };
};


var headerStyle= {
	fontWeight: "bold",
	fontSize: "36px",
	marginRight: "40px",
	marginBottom: "40px"
}

var courseStyle = {
	fontWeight: "bold",
	fontSize: "24px"
}

var buttonStyle= {
	height: "125px",
	width: "250px",
	backgroundImage: "url(item-bg.png)",
	backgroundSize: "contain",
	marginTop: "10px",
	marginBottom: "40px",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "4px",
	paddingBottom: "4px",
	border: "solid black 1px",
	display: "inline-block",
	position: "relative",
	boxShadow: "10px 10px 5px #888888",
	outline: "none"
}

var buttonStyles= {
	overflow: "auto"
}

export default connect(mapStateToProps)(LecturesList);