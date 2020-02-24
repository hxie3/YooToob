import React from 'react';
import { Link } from 'react-router-dom'
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

class VideoIndexItem extends React.Component {
    constructor(props){
        super(props)

        this.state = this.props.video
    }

    render() {
        let date = new Date(this.props.video.created_at);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return (
            <div className='index-item-container'>
                <Link className='thumbnail-link' to={`/watch/${this.props.video.id}`}>
                    <div className='clip-thumbnail'>
                        <video key={this.props.video.video} className='video'>
                            <source src={this.props.video.video} type='video/mp4' />
                        </video>
                    </div>
                </Link>
                <Link to={`/watch/${this.props.video.id}`}>
                    <div className='index-item-video-details'>
                        <img className='signin-pic video-profile-pic' src={this.props.video.profilePicture} alt="owner-profile-pic"/>
                        <div className='index-video-details'>
                            <h3 className='index-video-title-style'>
                                <span className='index-click-title'>
                                    <span className='index-title-string'>
                                        {this.props.video.title}
                                    </span>
                                </span>
                            </h3>
                            <div className='grid-style-scope'>
                                <div className='style-scope'>
                                    <div className='byline-container'>
                                        <div className='channel-name'>
                                            {this.props.video.username}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='metadata-line'>
                                <div className='bottom-metadata'>
                                    <span className='views'>
                                        {this.props.video.views} views
                                    </span>
                                        <span>{"    "}</span>
                                    <span className='date'>
                                        {month}/{day}/{year}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        );
    }
}

export default VideoIndexItem