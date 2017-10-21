import React from "react";
import VideoView from "../../components/VideoView/VideoView";

export default class LectureMedia extends React.Component {

  render() {
    var style = {
      'max-width':'500px', 
      'max-height':'500px'
    };
    return (
      <div className="lecture-media">
        <div className="container">
          <div className="video-wrapper">
            <VideoView
              videoSrc={'/' + this.props.courseId + "/" +  this.props.lectureId + '/video'}/>
          </div>
        </div>
        <div>
          <img src={'/image/' + this.props.courseId + "/" +  this.props.lectureId + '/2-0/' + '0'} style={style}/> 
        </div>
      </div>
    );
  }
}