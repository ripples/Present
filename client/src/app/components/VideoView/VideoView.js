import React from "react";
import videojs from "video.js";

export default class VideoView extends React.Component {
  componentDidMount() {
    const videoJsOptions = {
      height: 358,
      width: 638,
      autoPlay: true,
      controls: true,
      sources: [{
        src: this.props.videoSrc,
        type: "video/mp4"
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
    return (
      <div>
        <div className="video-view">
          <video 
            ref={node => this.videoNode = node}
            className="video-js vjs-default-skin vjs-big-play-centered">
          </video>
        </div>
      </div>
    );
  }
}