import React, { Component } from 'react';
import ReactImageFallback from 'react-image-fallback';

export default class LectureImage extends Component {

    render(){
        return(
            <ReactImageFallback src={this.props.src} fallbackImage={this.props.fallbackImage} cross-origin="use-credentials" style={images} className = "images"/>
        );
    }
}

var images = {
	maxHeight: "625px",
    maxWidth: "100%"
}