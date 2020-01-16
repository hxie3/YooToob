import React from 'react';
import { Link } from 'react-router-dom'


class VideoIndexItem extends React.Component {
    constructor(props){
        super(props)

        this.state = this.props.video
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className='index-item-container'>
                <Link className='thumbnail-link' to={`/watch/${this.props.video.id}`}>
                    <video className='clip-thumbnail'>
                        <source src={this.props.video.video} type='video/mp4' />
                    </video>
                </Link>
                <div className='index-item-video-details'>

                </div>
            </div>
        );
    }
}

export default VideoIndexItem