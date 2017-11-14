import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LecturesList extends Component {

	render() {
		return (
			<div className="container-fluid">
				<div className="col-md-3">
				</div>

				<div className="col-md-6">
					<h2 style={headerStyle}>{this.props.course.name} Lectures:</h2>
					{( typeof this.props.course !== "undefined" && typeof this.props.course.children !== "undefined") ?
						this.props.course.children.map((course, i) => {
							var patt = /^\d\d-\d\d-\d\d\d\d--\d\d-\d\d-\d\d$/;
							if (patt.test(course.name)) { 
								return (
									<div key={i}>
										<div style = {courseStyle}>{course.name.substring(0,10)}</div>
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
	marginBottom: "50px"
}

var courseStyle = {
	fontWeight: "bold",
	fontSize: "24px"
}

var buttonStyle= {
	height: "125px",
	width: "250px",
	backgroundImage: "url(../../../../item-bg.png)",
	backgroundSize: "contain",
	marginTop: "10px",
	marginBottom: "20px",
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