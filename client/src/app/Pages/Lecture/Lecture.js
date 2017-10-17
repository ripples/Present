import React from "react";
import LectureMedia from "../../components/LectureMedia/LectureMedia";

export default class Lecture extends React.Component {

	render() {
		return (
			<div className="lecture">
				<div className="lecture-header">
					<h2>
						{"Lecture: " + this.props.params.lectureId}
					</h2>
				</div>
				<div className="lecture-body">
					<LectureMedia
						lectureId = {this.props.params.lectureId}
						courseId = {this.props.params.courseId}
					/>
				</div>
			</div>
		);
	}
}