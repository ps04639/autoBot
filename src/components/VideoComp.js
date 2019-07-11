import React, { Component } from 'react';

class VideoComponent extends Component {

    render() {
        return (
            <video controls >
                <source src={this.props.videoPath} type="video/mp4"></source>
            </video>
        );
    }
}

export default VideoComponent;