import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LecturesList extends Component {

	render() {
		return (
			<div className="container-fluid">
				<div className="col-md-3">
				</div>

				<div className="col-md-6">
					<h2 style={headerStyle}>Lecture Dates:</h2>
					
					{( typeof this.props.course !== "undefined" && typeof this.props.course.children !== "undefined") ?
						this.props.course.children.map((course, i) => {
							var patt = /^\d\d-\d\d-\d\d\d\d--\d\d-\d\d-\d\d$/;
							if (patt.test(course.name)) { 
								return (
									<div key={i}>
										<Link to={"course/" + this.props.courseId + "/lecture/" + course.name}>
											<button type="button" style={buttonStyle}>{course.name}</button>
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
	fontWeight: "bold"
}

var buttonStyle= {
	backgroundColor: "white",
	borderRadius: "4px",
    marginTop: "20px",
    color: "#000080",
    paddingLeft: "10px",
    paddingRight: "10px",
    paddingTop: "4px",
	paddingBottom: "4px",
	border: "solid black 1px"
}