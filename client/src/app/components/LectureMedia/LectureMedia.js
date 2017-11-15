import React from "react";
import {connect} from "react-redux";
import {setLectureTime} from '../../Actions/action.js';
import VideoView from "../../components/VideoView/VideoView";
import LectureImage from '../LectureImage/LectureImage.js';

class LectureMedia extends React.Component {

	onVideoTimeUpdate = (newTime) => {
		this.props.setTime(newTime);
	}

	range(l){
		let x = []
		for(let i = 0; i < l; i++){
			x.push(i);
		}
		return x
	}

	componentWillUnmount(){
		this.props.setTime(0);
	}

	render() {
		if(this.props.manifest){
			var computerImages = this.range(this.props.manifest.computerCount).map( (e, i) => {
				return (
					<div key={i}>
						<LectureImage src={'/api/image/' + this.props.courseId + "/" + this.props.lectureId + '/1-' + i + '/' + this.props.time} alt="Computer Screen" />
					</div>
				);
			})
			var whiteBoardImages = this.range(this.props.manifest.whiteboardCount).map( (e, i) => {
				return (
					<div key={i}>
						<LectureImage src={'/api/image/' + this.props.courseId + "/" + this.props.lectureId + '/2-' + i + '/' + this.props.time} alt="Whiteboard"/>
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

const mapStateToProps = state => {
	
	return {
		time: state.lectureTime
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	
	return {
		setTime: json => dispatch(setLectureTime(json))
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(LectureMedia);
