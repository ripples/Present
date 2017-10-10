import React from "react";
import LectureMedia from "../../components/LectureMedia/LectureMedia";

class Lecture extends React.Component {

	componentDidMount() {
		if(this.props.course) {
			this.props.initLectureData();
		}
	}

	render() {
		const course = this.props.course;
		if(!course) {
			return (<div></div>);
		}
		return (
			<div className="lecture">
				<div className="lecture-header">
					<h1>
						{this.props.course.name}
					</h1>
					<h3>
						{lectureNameToDateString(this.props.lecture.id)}
					</h3>
				</div>
				<div className="lecture-body">
					<LectureMedia
						lecture = {this.props.lecture}
						media = {this.props.media}
						semester = {course.semester}
						courseId = {course.id}
					/>
				</div>
			</div>
		);
	}
}