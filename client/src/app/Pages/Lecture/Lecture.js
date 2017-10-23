import React from "react";
import LectureMedia from "../../components/LectureMedia/LectureMedia";

export default class Lecture extends React.Component {

	constructor(props){
		super(props)
		this.state = {}
	}

	componentDidMount(){
		fetch('/manifest/' + this.props.params.courseId + '/' + this.props.params.lectureId).then(
			res => (res.status === 200 ) ? res.json() : {}
		).then(
			json => this.setState({manifest: json})
		)
	}

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
						manifest = {this.state.manifest}
						lectureId = {this.props.params.lectureId}
						courseId = {this.props.params.courseId}
					/>
				</div>
			</div>
		);
	}
}