import React from "react";
import LectureMedia from "../../components/LectureMedia/LectureMedia";

class Lecture extends React.Component {

	render() {
		console.log(this.props.data);
		const course = this.props.data.context_title;
		if(!course) {
			return (<div></div>);
		}
		return (
			<div className="lecture">
				<div className="lecture-header">
					<h1>
						{this.props.data.context_title}
					</h1>
				</div>
				<div className="lecture-body">
					<LectureMedia
						lecture = {this.props.data.lecture}
						courseId = {this.props.data.lis_course_section_sourcedid}
					/>
				</div>
			</div>
		);
	}
}

export default Lecture;