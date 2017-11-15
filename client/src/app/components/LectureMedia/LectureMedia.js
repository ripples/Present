import React from "react";
import VideoView from "../../components/VideoView/VideoView";
import LectureImage from '../LectureImage/LectureImage.js';

export default class LectureMedia extends React.Component {

	constructor(props){
		super(props)
		this.state = {
			time: 0
		}
	}

	onVideoTimeUpdate = (newTime) => {
		this.setState({time: newTime})
	}

	range(l){
		let x = []
		for(let i = 0; i < l; i++){
			x.push(i);
		}
		return x
	}


	render() {

		if(this.props.manifest){
			var computerImages = this.range(this.props.manifest.computerCount).map( (e, i) => {
				return (
					<div key={i}>
						<LectureImage src={'/api/image/' + this.props.courseId + "/" + this.props.lectureId + '/1-' + i + '/' + this.state.time} alt={altImage} />
					</div>
				);
			})
			var whiteBoardImages = this.range(this.props.manifest.whiteboardCount).map( (e, i) => {
				return (
					<div key={i}>
						<LectureImage src={'/api/image/' + this.props.courseId + "/" + this.props.lectureId + '/2-' + i + '/' + this.state.time} alt="Whiteboard"/>
					</div>
				);
			})
		}
		return (
			<div className="lecture-media">
				<div className="container">
					<div>
						<VideoView
							videoSrc={'/api/video/' + this.props.courseId + "/" + this.props.lectureId } onVideoTimeUpdate={this.onVideoTimeUpdate} />
					</div>
				</div>
				<div>
					<style>{"\
						img{\
							max-width : 750px;\
							max-height : 750px;\
							border : solid black 1px;\
							margin : 10px;\
						}\
						img:hover{\
						max-width : 100%;\
						max-height : 100%;\
						}\
					"}</style>
					{computerImages ? computerImages: null}
					{whiteBoardImages ? whiteBoardImages: null}
				</div>
			</div>
		);
	}
}

var altImage = {
	backgroundImage: "url(no-comp-image-found.png)"
}