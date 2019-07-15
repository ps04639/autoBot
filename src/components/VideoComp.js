import React from 'react';

const VideoComponent = ( props ) =>
{
    return (
        <video controls >
            <source src={ props.videoPath } type="video/mp4"></source>
        </video>
    );

}

export default VideoComponent;