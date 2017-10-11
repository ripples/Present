import React from "react";
import LectureMedia from "../../components/LectureMedia/LectureMedia";

class Lecture extends React.Component {

	render() {
		const course = this.props.context_title;
		if(!course) {
			return (<div></div>);
		}
		return (
			<div className="lecture">
				<div className="lecture-header">
					<h1>
						{this.props.context_title}
					</h1>
				</div>
				<div className="lecture-body">
					<LectureMedia
						lecture = {this.props.lecture}
						courseId = {course.lis_course_section_sourcedid}
					/>
				</div>
			</div>
		);
	}
}

export default Lecture;