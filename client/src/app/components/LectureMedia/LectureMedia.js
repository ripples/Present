import React from "react";
import VideoView from "../../components/VideoView/VideoView";

class LectureMedia extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lecture = this.props.lecture;
    const semester = this.props.semester;
    const courseId = this.props.courseId;

    const API_VERSION = "v1";
    const BASE_URL = `http://${window.location.host}/api/${API_VERSION}`;

    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView
              videoSrc={`${BASE_URL}/media/${semester}/${courseId}/${lecture.id}/video`}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default LectureMedia;