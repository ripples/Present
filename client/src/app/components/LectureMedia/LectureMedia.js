import React from "react";
import {connect} from "react-redux";
import {setLectureTime} from '../../Actions/lectureTimeActions.js';
import VideoView from "../../components/VideoView/VideoView";
import LectureImage from '../LectureImage/LectureImage.js';
import {setLectureImage, clearLectureImage, setImageType, setIndex} from '../../Actions/lectureImageActions.js';
import {convertMonth} from '../../utils/utils.js';

class LectureMedia extends React.Component {

	componentWillMount(){
		this.props.setImageType("1");
		this.props.setIndex(0);
		this.props.setLectureImage('/api/image/' + this.props.lectureId + '/' + this.props.imageType + '-' + this.props.index + '/' + this.props.time);
	}
	
	
	onVideoTimeUpdate = (newTime) => {
		this.props.setTime(newTime);
		this.props.setLectureImage('/api/image/' + this.props.lectureId + '/' + this.props.imageType + '-' + this.props.index + '/' + this.props.time);
	}

	range(l){
		let x = []
		for(let i = 0; i < l; i++){
			x.push(i);
		}
		return x
	}

	onClick(value, type, i, e){
		this.props.setLectureImage(value);
		this.props.setImageType(type);
		this.props.setIndex(i);
	}

	componentWillUnmount(){
		this.props.setTime(0);
		this.props.clearLectureImage();
	}

	render() {
		if(this.props.manifest){
			var computerImages = this.range(this.props.manifest.computerCount).map( (e, i) => {
				return (
					<button key={i} style = {compButtons} onClick = {this.onClick.bind(this, ('/api/image/' + "/" + this.props.lectureId + '/1-' + i + '/' + this.props.time), "1", i)}>
						<LectureImage src={'/api/image/' + this.props.lectureId + '/1-' + i + '/' + this.props.time} fallbackImage = "images/no-comp-image-found.png"/>
					</button>
				);
			})
			var whiteBoardImages = this.range(this.props.manifest.whiteboardCount).map( (e, i) => {
				return (
					<button key={i} style = {wbButtons} onClick = {this.onClick.bind(this, ('/api/image/' + "/" + this.props.lectureId + '/2-' + i + '/' + this.props.time), "2", i)}>
						<LectureImage src={'/api/image/' + this.props.lectureId + '/2-' + i + '/' + this.props.time} fallbackImage = "images/no-comp-image-found.png"/>
					</button>
				);
			})
		}
		return (
			<div className="lecture-media">
				<div className="container-fluid" style ={lectureBody}>
					<div style = {lectureVideo}>
						<VideoView videoSrc={'/api/video/' + this.props.lectureId } style={lectureVideo} onVideoTimeUpdate={this.onVideoTimeUpdate} />
					</div>
					<div style = {selectedImage}>
						<LectureImage src = {this.props.lectureImage} fallbackImage = "images/no-comp-image-found.png"/>
					</div>
				</div>
				<div style = {date}>
					{"Lecture: " + convertMonth(this.props.lectureId.substring(0,10)) + this.props.lectureId.substring(3,5) + ", " + this.props.lectureId.substring(6,10)}
				</div>
				<div style = {imageContainer}>
					{computerImages ? computerImages: null}
					{whiteBoardImages ? whiteBoardImages: null}
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	
	return {
		time: state.lectureTime,
		lectureImage: state.lectureImage.image,
		imageType: state.lectureImage.type,
		index: state.lectureImage.index
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	
	return {
		setTime: (json) => dispatch(setLectureTime(json)),
		setLectureImage: (image) => dispatch(setLectureImage(image)),
		clearLectureImage: () => dispatch(clearLectureImage()),
		setImageType: (type) => dispatch(setImageType(type)),
		setIndex: (i) => dispatch(setIndex(i))
	}
};

var compButtons = {
	width: "11.35%",
	display:"inline",
	padding: "0",
	margin:"10px",
	border:"black 1px solid"
}

var wbButtons = {
	width: "20%",
	display:"inline",
	padding: "0",
	margin:"10px",
	border:"black 1px solid"
}

var lectureVideo = {
	position: "absolute"
}

var selectedImage = {
	position: "relative",
	zIndex: "-1",
	float: "right",
	border: "black 1px solid",
	bottom: "0"
}

var lectureBody = {
	marginLeft: "0",
	marginRight: "0",
	height:"80%",
	paddingBottom: "10px"
}

var imageContainer= {
	positon: "absolute",
	bottom:"0",
	margin:"0",
	padding:"10",
	width:"100%",
	height:"20%",
	overflowY:"hidden",
	overflowX:"auto",
	whiteSpace:"nowrap",
	backgroundColor:"gray"
}

var date = {
	fontSize:"20px",
	color:"white",
	backgroundColor:"gray"
}
export default connect(mapStateToProps, mapDispatchToProps)(LectureMedia);