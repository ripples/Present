import React from "react";
import videojs from "video.js";

export default class VideoView extends React.Component {
  componentDidMount() {
    const videoJsOptions = {
      height: 240,
      width: 320,
      autoPlay: true,
      controls: true,
      sources: [{
        src: this.props.videoSrc,
		type: "video/mp4",
		withCredentials: true
      }]
    };
    this.player = videojs(this.videoNode, videoJsOptions, () => {
      this.player.on("timeupdate", () => {
        this.props.onVideoTimeUpdate(this.player.currentTime());
      });
    });
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    var video = {
      margin: "0 auto"
    };
    if(this.props.manifest && (this.props.manifest.whiteboardCount + this.props.manifest.computerCount) > 0){
      video = {
        float: "left"
      }
    }

    return (
      <div>
        <div className="video-view">
          <video
            ref={node => this.videoNode = node}
            className="video-js vjs-default-skin vjs-big-play-centered"
            style = {video}>
          </video>
        </div>
      </div>
    );
  }
}

