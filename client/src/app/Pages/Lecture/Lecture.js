import React from "react";
import LectureMedia from "../../components/LectureMedia/LectureMedia";

class Lecture extends React.Component {

	render() {
		return (
			<div className="lecture">
				<div className="lecture-header">
					<h1>
						Lecture
					</h1>
				</div>
				<div className="lecture-body">
					<LectureMedia
						lecture = {this.props.params.lectureId}
						courseId = {this.props.params.courseId}
					/>
				</div>
			</div>
		);
	}
}

export default Lecture;