import React from "react";
import VideoView from "../../components/VideoView/VideoView";

class LectureMedia extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const courseId = this.props.courseId;

    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView
              videoSrc={'./' + this.props.courseId +'/09-02-2016--12-59-01/videoLarge.mp4'}/>
          </div>
        </div>
      </div>
    );
  }
}

export default LectureMedia;