import React from "react";
import VideoView from "../../components/VideoView/VideoView";

export default class LectureMedia extends React.Component {

  render() {
    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView
              videoSrc={'./' + this.props.courseId + "/" +  this.props.lectureId + '/videoLarge.mp4'}/>
          </div>
        </div>
      </div>
    );
  }
}