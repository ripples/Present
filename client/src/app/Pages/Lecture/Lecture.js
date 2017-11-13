import React from "react";
import LectureMedia from "../../components/LectureMedia/LectureMedia";

export default class Lecture extends React.Component {

	constructor(props){
		super(props)
		this.state = {}
	}

	componentDidMount(){
		fetch('/api/manifest/' + this.props.params.courseId + '/' + this.props.params.lectureId).then(
			res => (res.status === 200 ) ? res.json() : {}
		).then(
			json => this.setState({manifest: json})
		)
	}

	render() {
		return (
			<div className="container-fluid">
				<div className="col-md-2">
				</div>
				
				<div className="col-md-8">
					<div>
						<h2 style={headerStyle}>
							{"Lecture: " + this.props.params.lectureId.substring(0,10)}
						</h2>
					</div>
					<div>
						<LectureMedia
							manifest = {this.state.manifest}
							lectureId = {this.props.params.lectureId}
							courseId = {this.props.params.courseId}
						/>
					</div>
				</div>

				<div className="col-md-2">
				</div>
			</div>
		);
	}
}


var headerStyle = {
	fontWeight: "bold"
}