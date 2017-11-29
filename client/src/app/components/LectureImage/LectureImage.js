import React, { Component } from 'react';
import ReactImageFallback from 'react-image-fallback';

export default class LectureImage extends Component {

    render(){
        return(
            <div>
                <ReactImageFallback src={this.props.src} fallbackImage={this.props.fallbackImage} cross-origin="use-credentials"/>
            </div>
        );
    }
}