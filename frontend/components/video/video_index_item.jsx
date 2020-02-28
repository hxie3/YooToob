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
        let now = new Date(Date.now());
        let diffInSeconds = Math.floor((now - date) / 1000);
        let num;
        let when;
        let views = this.props.video.views;
        let viewsRender;
        if (views === 0) {
            viewsRender = "No views"
        } else if (views === 1) {
            viewsRender = `${views} view`
        } else {
            viewsRender = `${views} views`
        }
        if (diffInSeconds < 60) {
            if (diffInSeconds === 1) {
                when = <span className="date">
                    {diffInSeconds} second ago
                </span>
            } else {
                when = <span className="date">
                    {diffInSeconds} seconds ago
                </span>
            }
        } else if (diffInSeconds/60 < 60) {
            num = Math.floor(diffInSeconds / 60)
            if (num === 1) {
                when = <span className="date">
                    {num} minute ago
                </span>
            } else {
                when = <span className="date">
                    {num} minutes ago
                </span>
            }
        } else if (diffInSeconds/60/60 < 24) {
            num = Math.floor(diffInSeconds / 60 / 60);
            if (num === 1) {
                when = <span className="date">
                    {num} hour ago
                </span>
            } else {
                when = <span className="date">
                    {num} hours ago
                </span>
            }
        } else if (diffInSeconds/60/60/24 < 30) {
            num = Math.floor(diffInSeconds / 60 / 60 / 24)
            when = <span className="date">
                {num} {num === 1 ? ("day") : ("days")} ago
            </span>
        } else if (diffInSeconds/60/60/24/30 < 12) {
            num = Math.floor(diffInSeconds / 60 / 60 / 24 / 30)
            when = <span className="date">
                {num} {num === 1 ? ("month") : ("months")} ago
            </span>
        } else {
            num = Math.floor(diffInSeconds / 60 / 60 / 24 / 30 / 12);
            when = <span className="date">
                {num} {num === 1 ? ("year") : ("years")} ago
            </span>
        }
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
                                        {viewsRender}
                                    </span>
                                    <div className="fa">
                                        <i className="fas fa-circle"></i>
                                    </div>
                                    {when}
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