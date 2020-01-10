import React from 'react';

class VideoIndexItem extends React.Component {
    constructor(props){
        super(props)

        this.state = this.props.video
    }

    componentDidMount() {
    }

    render() {
        let video = this.props.video;
        return (
            <li>
                <span>{video.title}</span>
                <span>{video.username}</span>
                <span>{video.views}</span>
                <span>{video.published_at}</span>
            </li>
        );
    }
}

export default VideoIndexItem