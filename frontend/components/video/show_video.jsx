import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

class ShowVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            video: this.props.video,
            // videos: null
        }
    }

    componentDidMount(){
        this.props.fetchVideo(this.props.match.params.id).then(
            (res) => this.setState({ video: res.video } )
        )
        // this.props.fetchVideos().then(
        //     (res) => this.setState({videos: res.videos})
    }

    render() {
        let video = this.state.video;
        // let videos = this.state.videos;
        if (!video) return null
        // if (!videos) return null
        let date = new Date(this.props.video.created_at);
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        return (
            <div className='show-body'>
                <div className='something'>
                    <div className='columns'>
                        <div id='primary' className='show-body-left'>
                            <div>
                                <div className='player-outer'>
                                    <div className='player-container-outer'>
                                        <div className='player-container-inner'>
                                            <div className='player-container'>
                                                <video className='player' controls autoPlay>
                                                    <source src={this.props.video.video} />
                                                </video>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='info'>
                                    <div className='info-contents'>
                                        <div>
                                            <h1 className='title-show'>
                                                <span className='title-show-content'>
                                                    {this.props.video.title}
                                                </span>
                                            </h1>
                                            <div className='below-title'>
                                                <div className='info-text'>
                                                    <div className='count'>
                                                        <span className='count-value'>
                                                            {this.props.video.views} views
                                                        </span>
                                                        <span>{"    "}</span>
                                                        <span className='below-title-date'>
                                                            {month}/{day}/{year}
                                                        </span>
                                                    </div>
                                                </div>
                                                {/* <div className='menu-container'>
                                                    <div className='menu'>
                                                        <div className='menu-renderer'>
                                                            <div className='top-level-buttons'>
                                                                <div className='like-button'>
                                                                    <a className='like-button-toggle'>
                                                                        <div className='like-button-button'></div>

                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div> */}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='bottom-border-info'>
                                    <div className='top-row'>
                                        <div className='top-row-renderer'>
                                            <div className='owner-icon'>
                                                <img className='icon-margin' src={this.props.video.profilePicture} alt="profile-pic"/>
                                            </div>
                                            <div className='upload-info'>
                                                <div className='uploader-name'>
                                                    <div className='no-long-names'>
                                                        <div className='only-block'>
                                                            <div className='display-uploader'>
                                                                {this.props.video.username}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='collapser collapsed'>
                                        <div className='collapser-content'>
                                            <div className='collapser-description'>
                                                <div className='description-format'>
                                                    {this.props.video.description}
                                                </div>
                                            </div>
                                        </div>
                                        <button className='show-more'>
                                            <span className='show-more-string'>Show more</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id='secondary' className='show-body-right'>
                            <div className='items'>
                                {/* {(videos).map((videoItem) => {
                                    if (videoItem.id === this.props.video.id) return null
                                    return (
                                        <div className='index-show-list'>
                                            <div className='dismissable'>
                                                <div className='video-item-show'>
                                                    <Link className='thumbnail-show' to={`/watch/${video.id}`}>
                                                        <div className='after-thumbnail'>
                                                            <video>
                                                                <source src={this.props.video.video}/>
                                                            </video>
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className='video-item-details-show'>

                                                </div>
                                            </div>
                                        </div>
                                    )
                                })} */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowVideo