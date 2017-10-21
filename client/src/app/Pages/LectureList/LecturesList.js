import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LecturesList extends Component {

	render() {
		return (
			<div>
				<h1>Lecture Dates:</h1>
				{( typeof this.props.course !== "undefined" && typeof this.props.course.children !== "undefined") ?
					this.props.course.children.map((course, i) => {
						return (
							<div key={i}>
								<Link to={"course/" + this.props.courseId + "/lecture/" + course.name}>
									<button type="button">{course.name}</button>
								</Link>
							</div>
						)
					}) : null
				}
			</div>
		);
	}
}