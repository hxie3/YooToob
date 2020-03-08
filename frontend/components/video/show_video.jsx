import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Link, Redirect } from 'react-router-dom';
import CommentFormContainer from '../comment/create_comment_form_container';
import CommentIndexItemContainer from '../comment/comment_index_item_container'

class ShowVideo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            video: this.props.video,
            videoId: this.props.videoId,
            videos: this.props.videos,
            incrementViews: true,
        }

        this.handleShow = this.handleShow.bind(this);
        this.incrementViews = this.incrementViews.bind(this);
        this.redirectLogin = this.redirectLogin.bind(this);
        this.handleLike = this.handleLike.bind(this);
        this.handleDislike = this.handleDislike.bind(this);
    }

    handleLike(e) {
        e.preventDefault();
        if (!this.props.currentUser) {
            this.props.openModal('login');
            return;
        }
        if (!this.props.like) {
            this.props.createLike({ user_id: this.props.currentUser.id, likeable_type: 'Video', likeable_id: this.props.video.id, liked: true })
                .then(() => {
                    this.props.fetchVideo(this.props.match.params.id);
                })
            document.getElementsByClassName("like-button-toggle")[0].classList.add("toggled");
            document.getElementsByClassName("like-button-button")[0].classList.add("toggled");
        } else if (this.props.like.liked) {
            this.props.deleteLike(this.props.like.id)
                .then(() => {
                    this.props.fetchVideo(this.props.match.params.id);
                })
            document.getElementsByClassName("like-button-toggle")[0].classList.remove("toggled");
            document.getElementsByClassName("like-button-button")[0].classList.remove("toggled");
        } else {
            let like = Object.assign({}, this.props.like);
            like.liked = true;
            this.props.updateLike(like)
                .then(() => {
                    this.props.fetchVideo(this.props.match.params.id);
                })
            document.getElementsByClassName("like-button-toggle")[0].classList.add("toggled");
            document.getElementsByClassName("like-button-button")[0].classList.add("toggled");
            document.getElementsByClassName("dislike-button-toggle")[0].classList.remove("toggled");
            document.getElementsByClassName("dislike-button-button")[0].classList.remove("toggled");
        }
    }

    handleDislike(e) {
        e.preventDefault();
        if (!this.props.currentUser) {
            this.props.openModal('login');
            return;
        }
        if (!this.props.like) {
            this.props.createLike({ user_id: this.props.currentUser.id, likeable_type: 'Video', likeable_id: this.props.video.id, liked: false })
                .then(() => {
                    this.props.fetchVideo(this.props.match.params.id);
                })
            document.getElementsByClassName("dislike-button-toggle")[0].classList.add("toggled");
            document.getElementsByClassName("dislike-button-button")[0].classList.add("toggled");
        } else if (!this.props.like.liked) {
            this.props.deleteLike(this.props.like.id)
                .then(() => {
                    this.props.fetchVideo(this.props.match.params.id);
                })
            document.getElementsByClassName("dislike-button-toggle")[0].classList.remove("toggled");
            document.getElementsByClassName("dislike-button-button")[0].classList.remove("toggled");
        } else {
            let like = Object.assign({}, this.props.like);
            like.liked = false;
            this.props.updateLike(like)
                .then(() => {
                    this.props.fetchVideo(this.props.match.params.id);
                })
            document.getElementsByClassName("dislike-button-toggle")[0].classList.add("toggled");
            document.getElementsByClassName("dislike-button-button")[0].classList.add("toggled");
            document.getElementsByClassName("like-button-toggle")[0].classList.remove("toggled");
            document.getElementsByClassName("like-button-button")[0].classList.remove("toggled");
        }
        this.props.fetchVideo(this.props.match.params.id);
    }

    componentDidMount(){
        this.props.fetchVideo(this.props.match.params.id)
            .then(() => {
                if(this.props.like) {
                    if(this.props.like.liked) {
                        document.getElementsByClassName("like-button-toggle")[0].classList.add("toggled");
                        document.getElementsByClassName("like-button-button")[0].classList.add("toggled");
                    } else {
                        document.getElementsByClassName("dislike-button-toggle")[0].classList.add("toggled");
                        document.getElementsByClassName("dislike-button-button")[0].classList.add("toggled");
                    }
                }
            })
        this.props.fetchVideos();
        this.props.fetchComments();
    }

    incrementViews(e) {
        e.preventDefault();
        if (this.props.video) {
            if(this.state.incrementViews) {
                let newvideo = Object.assign({}, this.props.video)
                newvideo.views += 1;
                this.props.incrementViews(newvideo);
                this.setState({ incrementViews: false })
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.video !== prevState.video) {
            return { video: nextProps.video };
        }
        else return null;
    }

    componentDidUpdate(prevProps) {
        if (this.props.video) {
            if (prevProps.currentUser !== this.props.currentUser) {
                this.props.fetchVideo(this.props.videoId)
                    .then(() => {
                        if (this.props.like) {
                            if (this.props.like.liked) {
                                document.getElementsByClassName("like-button-toggle")[0].classList.add("toggled");
                                document.getElementsByClassName("like-button-button")[0].classList.add("toggled");
                                document.getElementsByClassName("dislike-button-toggle")[0].classList.remove("toggled");
                                document.getElementsByClassName("dislike-button-button")[0].classList.remove("toggled");
                            } else {
                                document.getElementsByClassName("dislike-button-toggle")[0].classList.add("toggled");
                                document.getElementsByClassName("dislike-button-button")[0].classList.add("toggled");
                                document.getElementsByClassName("like-button-toggle")[0].classList.remove("toggled");
                                document.getElementsByClassName("like-button-button")[0].classList.remove("toggled");
                            }
                        } else {
                            document.getElementsByClassName("dislike-button-toggle")[0].classList.remove("toggled");
                            document.getElementsByClassName("dislike-button-button")[0].classList.remove("toggled");
                            document.getElementsByClassName("like-button-toggle")[0].classList.remove("toggled");
                            document.getElementsByClassName("like-button-button")[0].classList.remove("toggled");
                        }
                    })
                this.props.fetchComments();
            }
            if (prevProps.match.params.id !== this.props.match.params.id) {
                //Perform some operation here
                this.props.fetchVideo(this.props.videoId)
                    .then(() => {
                        if (this.props.like) {
                            if (this.props.like.liked) {
                                document.getElementsByClassName("like-button-toggle")[0].classList.add("toggled");
                                document.getElementsByClassName("like-button-button")[0].classList.add("toggled");
                            } else {
                                document.getElementsByClassName("dislike-button-toggle")[0].classList.add("toggled");
                                document.getElementsByClassName("dislike-button-button")[0].classList.add("toggled");
                            }
                        }
                    })
                this.setState({ videoId: this.props.videoId});
                this.setState({ incrementViews: true })
                document.getElementsByClassName("like-button-toggle")[0].classList.remove("toggled");
                document.getElementsByClassName("like-button-button")[0].classList.remove("toggled");
                document.getElementsByClassName("dislike-button-toggle")[0].classList.remove("toggled");
                document.getElementsByClassName("dislike-button-button")[0].classList.remove("toggled");
            }
            document.getElementsByClassName("show-more")[0].classList.remove("hidden")
            if (document.getElementsByClassName("collapser-content")[0].offsetHeight === document.getElementsByClassName("collapser-description")[0].offsetHeight) {
                document.getElementsByClassName("show-more")[0].classList.add("hidden")
            }
        }
    }

    redirectLogin(e){
        e.preventDefault();
        this.props.openModal("login");
    }

    handleShow(e) {
        e.preventDefault();
        const collapserContent = document.getElementsByClassName("collapser-content2")[0];
        collapserContent.classList.toggle("collapser-content");
        document.getElementsByClassName("show-more-string")[0].innerHTML === "Show less" ? (document.getElementsByClassName("show-more-string")[0].innerHTML = "Show more") : (document.getElementsByClassName("show-more-string")[0].innerHTML = "Show less");
    }

    render() {
        let months = {
            1: "Jan",
            2: "Feb",
            3: "Mar",
            4: "Apr",
            5: "May",
            6: "Jun",
            7: "Jul",
            8: "Aug",
            9: "Sep",
            10: "Oct",
            11: "Nov",
            12: "Dec"
        }
        let { video, videos, videoId } = this.props
        if (!video) return null
        if (!videos) return null
        if (!videoId) return null
        let date = new Date(this.props.video.created_at);
        let month = months[date.getMonth() + 1];
        let day = date.getDate();
        let year = date.getFullYear();
        let views = this.props.video.views;
        let viewsRender;
        if (views === 0) {
            viewsRender = "No views"
        } else if (views === 1) {
            viewsRender = `${views} view`
        } else {
            viewsRender = `${views} views`
        }
        let commentsLength = this.props.comments.length;
        let commentsRender;
        if (commentsLength === 0) {
            commentsRender = "No Comments"
        } else if (commentsLength === 1) {
            commentsRender = `${commentsLength} Comment`
        } else {
            commentsRender = `${commentsLength} Comments`
        }
        // let styles = {
        //     width: `${ this.props.video.likes / this.props.video.dislikes }`
        // }
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
                                                <video poster={this.state.video.thumbnail} key={this.state.video.video} onPlay={this.incrementViews} className='player' controls autoPlay>
                                                    <source src={this.state.video.video} />
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
                                                            {viewsRender}
                                                        </span>
                                                        <div className="fa">
                                                            <i className="fas fa-circle"></i>
                                                        </div>
                                                        <span className='below-title-date'>
                                                            {month} {day}, {year}
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className='menu-container'>
                                                    <div className='menu'>
                                                        <div className='menu-renderer'>
                                                            <div className='top-level-buttons'>
                                                                <div className='like-button'>
                                                                    <div onClick={this.handleLike} className='like-button-toggle'>
                                                                        <div className='like-button-button'>
                                                                            <div className='like-button-icon fa'>
                                                                                <i className="fas fa-thumbs-up video-thumbs-up"></i>
                                                                            </div>
                                                                        </div>
                                                                        <span className='video-likes-string'>
                                                                            {this.props.video.likes}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='dislike-button'>
                                                                    <div onClick={this.handleDislike} className='dislike-button-toggle'>
                                                                        <div className='dislike-button-button'>
                                                                            <div className='dislike-button-icon fa'>
                                                                                <i className="fas fa-thumbs-down video-thumbs-down"></i>
                                                                            </div>
                                                                        </div>
                                                                        <span className='video-dislikes-string'>
                                                                            {this.props.video.dislikes}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                                <div className='video-dropdown'>
                                                                    <div className='video-dropdown-button'>
                                                                        <div className="center-self">
                                                                            <div className='video-dropdown-button-icon fa'>
                                                                                <i className="fas fa-ellipsis-h"></i>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="likes-container">
                                                        <div className="likes-visualizer">
                                                        {/* style = {styles}
                                                        > */}

                                                        </div>
                                                    </div>
                                                </div>
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
                                    <div className='collapser'>
                                        <div className='collapser-content collapser-content2'>
                                            <div className='collapser-description'>
                                                <div className='description-format'>
                                                    {this.props.video.description}
                                                </div>
                                            </div>
                                        </div>
                                        <button onClick={this.handleShow} className='show-more'>
                                            <span className='show-more-string'>Show more</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="comment-section">
                                <div className="comment-section-header">
                                    <div className="comment-section-header-title">
                                        <h2 className="comment-section-count">
                                            {commentsRender}
                                        </h2>
                                    </div>
                                    {this.props.currentUser ? (
                                        <CommentFormContainer />
                                    ) : (
                                        <div className="comment-form">
                                            <img className="comment-profile-picture" src={window.defaultURL} alt="profile-picture" />
                                            <div className="comment-form-body-container">
                                                <textarea onClick={this.redirectLogin} className="comment-form-body-textarea" placeholder="Add a public comment..."></textarea>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <ul className="comment-section-index">
                                    {this.props.comments.map((comment, index) => (
                                        <CommentIndexItemContainer key={index} comment={comment}/>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div id='secondary' className='show-body-right'>
                            <div className='items'>
                                {(Object.values(videos)).map((videoItem, index) => {
                                    if (videoItem.id === parseInt(this.state.videoId)) return
                                    let viewsVideoItem = videoItem.views;
                                    let viewsVideoItemRender;
                                    if (viewsVideoItem === 0) {
                                        viewsVideoItemRender = "No views"
                                    } else if (viewsVideoItem === 1) {
                                        viewsVideoItemRender = `${viewsVideoItem} view`
                                    } else {
                                        viewsVideoItemRender = `${viewsVideoItem} views`
                                    }
                                    return (
                                        <div key={index} className='index-show-list'>
                                            <div className='dismissable'>
                                                <div className='video-item-show'>
                                                    <Link className='thumbnail-show' to={`/watch/${videoItem.id}`}>
                                                        <div className='after-thumbnail'>
                                                            <img className="index-thumbnail" src={videoItem.thumbnail} alt="thumbnail"/>
                                                            {/* <video poster={videoItem.thumbnail} source={videoItem.video} className="show-video-index">
                                                                <source src={videoItem.video}/>
                                                            </video> */}
                                                        </div>
                                                    </Link>
                                                </div>
                                                <div className='video-item-details-show'>
                                                    <Link to={`/watch/${videoItem.id}`}>
                                                        <div className="show-title-string">
                                                            {videoItem.title}
                                                        </div>
                                                        <div className="show-username-string">
                                                            {videoItem.username}
                                                        </div>
                                                        <div className="show-username-string">
                                                            {viewsVideoItemRender}
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ShowVideo