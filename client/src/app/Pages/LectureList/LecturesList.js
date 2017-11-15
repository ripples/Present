import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LecturesList extends Component {

	convertMonth(date) {
		if(date.substring(0,2) === "01") {
			return "January ";
		}
		else if(date.substring(0,2) === "02") {
			return "February ";
		}
		else if(date.substring(0,2) === "03") {
			return "March ";
		}
		else if(date.substring(0,2) === "04") {
			return "April ";
		}
		else if(date.substring(0,2) === "05") {
			return "May ";
		}
		else if(date.substring(0,2) === "06") {
			return "June ";
		}
		else if(date.substring(0,2) === "07") {
			return "July ";
		}
		else if(date.substring(0,2) === "08") {
			return "August ";
		}
		else if(date.substring(0,2) === "09") {
			return "September ";
		}
		else if(date.substring(0,2) === "10") {
			return "October ";
		}
		else if(date.substring(0,2) === "11") {
			return "November ";
		}
		else if(date.substring(0,2) === "12") {
			return "December ";
		}
		else {
			return date;
		}
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="col-md-3">
				</div>

				<div className="col-md-6">
					<h2 style={headerStyle}>{this.props.courseTitle} Lectures:</h2>
					{( typeof this.props.course !== "undefined" && typeof this.props.course.children !== "undefined") ?
						this.props.course.children.map((course, i) => {
							var patt = /^\d\d-\d\d-\d\d\d\d--\d\d-\d\d-\d\d$/;
							if (patt.test(course.name)) { 
								return (
									<div key={i}>
										<div style = {courseStyle}>{this.convertMonth(course.name.substring(0,10)) + course.name.substring(3,5) + " " + course.name.substring(6,10)}</div>
										<Link to={"course/" + this.props.courseId + "/lecture/" + course.name}>
											<button type="button" style={buttonStyle}>
											<style>{"\
											button:hover {\
												max-width : 200%;\
												max-height : 200%;\
											}\
											"}</style>
											</button>
										</Link>
									</div>
								);
							} else {
								return (<div key={i}></div>)
							}
						}) : null
					}
				</div>

				<div className="col-md-3">
				</div>
			</div>
		);
	}
}

var headerStyle= {
	fontWeight: "bold",
	fontSize: "36px",
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