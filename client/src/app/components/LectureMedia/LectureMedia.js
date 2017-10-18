import React from "react";
import VideoView from "../../components/VideoView/VideoView";

export default class LectureMedia extends React.Component {

  render() {
    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView
              videoSrc={'/' + this.props.courseId + "/" +  this.props.lectureId + '/video'}/>
          </div>
        </div>
        <div>
          <img src={'/' + this.props.courseId + "/" +  this.props.lectureId + '/image/' + '0'}/> 
        </div>
      </div>
    );
  }
}