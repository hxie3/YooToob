import React from 'react';
import UpdateCommentContainer from './update_comment_form_container';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

class CommentIndexItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            comment: this.props.comment,
            edit: false
        };
        this.handleReadMore = this.handleReadMore.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleCommentEdit = this.handleCommentEdit.bind(this);
        this.handleCancelChild = this.handleCancelChild.bind(this);
        this.handleCommentDelete = this.handleCommentDelete.bind(this);
        this.handleCommentLike = this.handleCommentLike.bind(this);
        this.handleCommentDislike = this.handleCommentDislike.bind(this);
    }

    componentDidMount() {
        let commentBody = document.getElementById(`comment-${this.props.comment.id}`);
        let readMore = document.getElementById(`read-${this.props.comment.id}`);
        if (commentBody) {
            if (commentBody.offsetHeight < 96) {
                readMore.classList.add("hidden");
            } else {
                readMore.classList.remove("hidden");
            }
        }
        if (this.props.like) {
            if (this.props.like.liked) {
                document.getElementById(`comment-like-button-toggle-${this.props.comment.id}`).classList.add("toggled");
                document.getElementById(`comment-like-button-button-${this.props.comment.id}`).classList.add("toggled");
            } else {
                document.getElementById(`comment-dislike-button-toggle-${this.props.comment.id}`).classList.add("toggled");
                document.getElementById(`comment-dislike-button-button-${this.props.comment.id}`).classList.add("toggled");
            }
        }
        if (document.getElementById(`comment-edit-dropdown-${this.props.comment.id}`)) {
            const $menu = $(`#comment-edit-dropdown-${this.props.comment.id}`);
            $(document).mouseup(e => {
                if (this.state.edit) return
                if (!document.getElementById(`edit-${this.props.comment.id}`)) return
                if (!$menu.is(e.target) && ($menu.has(e.target).length === 0)) {
                    if (this.props.comment.userId === this.props.currentUser) {
                        const comment = $(`#comment-index-item-${this.props.comment.id}`)
                        if (comment.is(e.target) || comment.has(e.target).length === 1) {
                            document.getElementById(`comment-edit-${this.props.comment.id}`).classList.add("hidden");
                            document.getElementById(`edit-${this.props.comment.id}`).classList.remove("active");
                        } else {
                            document.getElementById(`edit-${this.props.comment.id}`).classList.remove("active");
                            document.getElementById(`edit-${this.props.comment.id}`).classList.add("hidden");
                            document.getElementById(`comment-edit-${this.props.comment.id}`).classList.add("hidden");
                        }
                    }
                }
            });
        }
    }

    componentDidUpdate() {
        let commentBody = document.getElementById(`comment-${this.props.comment.id}`);
        let readMore = document.getElementById(`read-${this.props.comment.id}`);
        if (commentBody) {
            if (commentBody.offsetHeight < 96) {
                readMore.classList.add("hidden");
            } else {
                readMore.classList.remove("hidden");
            }
        }
        if (!this.props.currentUser) {
            document.getElementById(`comment-dislike-button-toggle-${this.props.comment.id}`).classList.remove("toggled");
            document.getElementById(`comment-dislike-button-button-${this.props.comment.id}`).classList.remove("toggled");
            document.getElementById(`comment-like-button-toggle-${this.props.comment.id}`).classList.remove("toggled");
            document.getElementById(`comment-like-button-button-${this.props.comment.id}`).classList.remove("toggled");
        } else {
            if (this.props.like) {
                if (this.props.like.liked) {
                    document.getElementById(`comment-like-button-toggle-${this.props.comment.id}`).classList.add("toggled");
                    document.getElementById(`comment-like-button-button-${this.props.comment.id}`).classList.add("toggled");
                    document.getElementById(`comment-dislike-button-toggle-${this.props.comment.id}`).classList.remove("toggled");
                    document.getElementById(`comment-dislike-button-button-${this.props.comment.id}`).classList.remove("toggled");
                } else {
                    document.getElementById(`comment-dislike-button-toggle-${this.props.comment.id}`).classList.add("toggled");
                    document.getElementById(`comment-dislike-button-button-${this.props.comment.id}`).classList.add("toggled");
                    document.getElementById(`comment-like-button-toggle-${this.props.comment.id}`).classList.remove("toggled");
                    document.getElementById(`comment-like-button-button-${this.props.comment.id}`).classList.remove("toggled");
                }
            } else {
                document.getElementById(`comment-dislike-button-toggle-${this.props.comment.id}`).classList.remove("toggled");
                document.getElementById(`comment-dislike-button-button-${this.props.comment.id}`).classList.remove("toggled");
                document.getElementById(`comment-like-button-toggle-${this.props.comment.id}`).classList.remove("toggled");
                document.getElementById(`comment-like-button-button-${this.props.comment.id}`).classList.remove("toggled");
            }
        }
        if (document.getElementById(`comment-edit-dropdown-${this.props.comment.id}`)) {
            const $menu = $(`#comment-edit-dropdown-${this.props.comment.id}`);
            $(document).mouseup(e => {
                if (this.state.edit) return
                if (!document.getElementById(`edit-${this.props.comment.id}`)) return
                if (!$menu.is(e.target) && ($menu.has(e.target).length === 0)) {
                    if (this.props.comment.userId === this.props.currentUser) {
                        const comment = $(`#comment-index-item-${this.props.comment.id}`)
                        if (comment.is(e.target) || comment.has(e.target).length === 1) {
                            document.getElementById(`comment-edit-${this.props.comment.id}`).classList.add("hidden");
                            document.getElementById(`edit-${this.props.comment.id}`).classList.remove("active");
                        } else {
                            document.getElementById(`edit-${this.props.comment.id}`).classList.remove("active");
                            document.getElementById(`edit-${this.props.comment.id}`).classList.add("hidden");
                            document.getElementById(`comment-edit-${this.props.comment.id}`).classList.add("hidden");
                        }
                    }
                }
            });
        }
    }

    handleReadMore(e) {
        e.preventDefault();
        if (e.currentTarget.innerHTML === "Read more") {
            e.currentTarget.innerHTML = "Show less";
            document.getElementById(`expand-${this.props.comment.id}`).style.maxHeight = 'none';
        } else {
            e.currentTarget.innerHTML = "Read more";
            document.getElementById(`expand-${this.props.comment.id}`).style.maxHeight = '80px';
        }
    }

    handleMouseEnter(e) {
        e.preventDefault();
        if (document.getElementById(`edit-${this.props.comment.id}`)) {
            document.getElementById(`edit-${this.props.comment.id}`).classList.remove("hidden");
        }
    }

    handleMouseLeave(e) {
        e.preventDefault();
        if (document.getElementById(`edit-${this.props.comment.id}`)) {
            if (!Array.from(document.getElementById(`edit-${this.props.comment.id}`).classList).includes("active")) {
                document.getElementById(`edit-${this.props.comment.id}`).classList.add("hidden");
            }
        }
    }

    handleDropdown(e) {
        e.preventDefault();
        document.getElementById(`comment-edit-${this.props.comment.id}`).classList.toggle("hidden");
        document.getElementById(`edit-${this.props.comment.id}`).classList.toggle("active");
    }

    handleCommentEdit(e) {
        e.preventDefault();
        this.setState({ edit: true })
    }

    handleCommentDelete(e) {
        e.preventDefault();
        this.props.deleteComment(this.props.comment.id);
    }

    handleCancelChild() {
        this.setState({ edit: false })
    }

    handleCommentLike(e) {
        e.preventDefault();
        if (!this.props.currentUser) {
            this.props.openModal('login');
            return;
        }
        if (!this.props.like) {
            this.props.createLike({ user_id: this.props.currentUser, likeable_type: 'Comment', likeable_id: this.props.comment.id, liked: true })
                .then(() => {
                    this.props.fetchComment(this.props.comment.id);
                })
            document.getElementById(`comment-like-button-toggle-${this.props.comment.id}`).classList.add("toggled");
            document.getElementById(`comment-like-button-button-${this.props.comment.id}`).classList.add("toggled");
        } else if (this.props.like.liked) {
            this.props.deleteLike(this.props.like.id)
                .then(() => {
                    this.props.fetchComment(this.props.comment.id);
                })
            document.getElementById(`comment-like-button-toggle-${this.props.comment.id}`).classList.remove("toggled");
            document.getElementById(`comment-like-button-button-${this.props.comment.id}`).classList.remove("toggled");
        } else {
            let like = Object.assign({}, this.props.like);
            like.liked = true;
            this.props.updateLike(like)
                .then(() => {
                    this.props.fetchComment(this.props.comment.id);
                })
            document.getElementById(`comment-like-button-toggle-${this.props.comment.id}`).classList.add("toggled");
            document.getElementById(`comment-like-button-button-${this.props.comment.id}`).classList.add("toggled");
            document.getElementById(`comment-dislike-button-toggle-${this.props.comment.id}`).classList.remove("toggled");
            document.getElementById(`comment-dislike-button-button-${this.props.comment.id}`).classList.remove("toggled");
        }
    }

    handleCommentDislike(e) {
        e.preventDefault();
        if (!this.props.currentUser) {
            this.props.openModal('login');
            return;
        }
        if (!this.props.like) {
            this.props.createLike({ user_id: this.props.currentUser, likeable_type: 'Comment', likeable_id: this.props.comment.id, liked: false })
                .then(() => {
                    this.props.fetchComment(this.props.comment.id);
                })
            document.getElementById(`comment-dislike-button-toggle-${this.props.comment.id}`).classList.add("toggled");
            document.getElementById(`comment-dislike-button-button-${this.props.comment.id}`).classList.add("toggled");
        } else if (!this.props.like.liked) {
            this.props.deleteLike(this.props.like.id)
                .then(() => {
                    this.props.fetchComment(this.props.comment.id);
                })
            document.getElementById(`comment-dislike-button-toggle-${this.props.comment.id}`).classList.remove("toggled");
            document.getElementById(`comment-dislike-button-button-${this.props.comment.id}`).classList.remove("toggled");
        } else {
            let like = Object.assign({}, this.props.like);
            like.liked = false;
            this.props.updateLike(like)
                .then(() => {
                    this.props.fetchComment(this.props.comment.id);
                })
            document.getElementById(`comment-dislike-button-toggle-${this.props.comment.id}`).classList.add("toggled");
            document.getElementById(`comment-dislike-button-button-${this.props.comment.id}`).classList.add("toggled");
            document.getElementById(`comment-like-button-toggle-${this.props.comment.id}`).classList.remove("toggled");
            document.getElementById(`comment-like-button-button-${this.props.comment.id}`).classList.remove("toggled");
        }
    }

    render() {
        if (this.state.edit) {
            return (
                <li id={`comment-index-item-${this.props.comment.id}`} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className="comment-index-item">
                    <UpdateCommentContainer comment={this.props.comment} cancelEdit={this.handleCancelChild}/>
                </li>
            )
        } else {
            let date = new Date(this.props.comment.created_at);
            let now = new Date(Date.now());
            let diffInSeconds = Math.floor((now - date) / 1000);
            if (diffInSeconds <= 0) {
                diffInSeconds = 1;
            }
            let num;
            let when;
            if (diffInSeconds < 60) {
                if (diffInSeconds === 1 || diffInSeconds === 0) {
                    when = <span className="date">
                        1 second ago
                    </span>
                } else {
                    when = <span className="date">
                        {diffInSeconds} seconds ago
                    </span>
                }
            } else if (diffInSeconds / 60 < 60) {
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
            } else if (diffInSeconds / 60 / 60 < 24) {
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
            } else if (diffInSeconds / 60 / 60 / 24 < 7) {
                num = Math.floor(diffInSeconds / 60 / 60 / 24)
                when = <span className="date">
                    {num} {num === 1 ? ("day") : ("days")} ago
                </span>
            } else if (diffInSeconds / 60 / 60 / 24 / 7 < 4.286) {
                num = Math.floor(diffInSeconds / 60 / 60 / 24 / 7)
                when = <span className="date">
                    {num} {num === 1 ? ("week") : ("weeks")} ago
                </span>
            }
            else if (diffInSeconds / 60 / 60 / 24 / 7 / 4.286 < 12) {
                num = Math.floor(diffInSeconds / 60 / 60 / 24 / 7 / 4.286)
                when = <span className="date">
                    {num} {num === 1 ? ("month") : ("months")} ago
                </span>
            } else {
                num = Math.floor(diffInSeconds / 60 / 60 / 24 / 7 / 4.286 / 12);
                when = <span className="date">
                    {num} {num === 1 ? ("year") : ("years")} ago
                </span>
            }
            return (
                <li id={`comment-index-item-${this.props.comment.id}`} onMouseOver={this.handleMouseEnter} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className="comment-index-item">
                    <div className="comment-index-item-contents">
                        <div className="comment-owner">
                            <img className="comment-profile-picture" src={this.props.comment.profilePicture} alt="profile-pic"/>
                            <div className="comment-main">
                                <div className="comment-main-header">
                                    <div className="comment-main-header-author">
                                        <span className="author-string">
                                            {this.props.comment.username}
                                        </span>
                                        <span className="comment-uploaded-ago">
                                            {when}
                                        </span>
                                    </div>
                                </div>
                                <div className="comment-expander">
                                    <div id={`expand-${this.props.comment.id}`} className="comment-expander-contents">
                                        <span id={`comment-${this.props.comment.id}`} className="comment-expander-string">
                                            {this.props.comment.body}
                                        </span>
                                    </div>
                                    <div onClick={this.handleReadMore} id={`read-${this.props.comment.id}`} className="read-more">Read more</div>
                                    <div className='comment-like-button'>
                                        <div id={`comment-like-button-toggle-${this.props.comment.id}`} onClick={this.handleCommentLike} className='comment-like-button-toggle'>
                                            <div id={`comment-like-button-button-${this.props.comment.id}`} className='comment-like-button-button'>
                                                <div className='comment-like-button-icon fa'>
                                                    <i className="fas fa-thumbs-up comment-thumbs-up"></i>
                                                </div>
                                            </div>
                                            <span className='comment-likes-string'>
                                                { this.props.comment.likes }
                                            </span>
                                        </div>
                                    </div>
                                    <div className='comment-dislike-button'>
                                        <div id={`comment-dislike-button-toggle-${this.props.comment.id}`} onClick={this.handleCommentDislike} className='comment-dislike-button-toggle'>
                                            <div id={`comment-dislike-button-button-${this.props.comment.id}`} className='comment-dislike-button-button'>
                                                <div className='comment-dislike-button-icon fa'>
                                                    <i className="fas fa-thumbs-down comment-thumbs-down"></i>
                                                </div>
                                            </div>
                                            <span className='comment-dislikes-string'>
                                                { this.props.comment.dislikes }
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            { this.props.currentUser === this.props.comment.userId ? (
                                <div id={`comment-edit-dropdown-${this.props.comment.id}`}>
                                    <div onClick={this.handleDropdown} id={`edit-${this.props.comment.id}`} className="edit-comment fa hidden">
                                        <i className="fas fa-ellipsis-v"></i>
                                        <div onClick={(e) => {e.stopPropagation()}} id={`comment-edit-${this.props.comment.id}`} className="comment-edit-dropdown hidden">
                                            <div className="inside-dropdown">
                                                <div onClick={this.handleCommentEdit} id={`comment-edit-button-${this.props.comment.id}`} className="comment-edit-button">
                                                    <div className="fa fa-pen-container">
                                                        <i className="fas fa-edit"></i>
                                                    </div>
                                                    Edit
                                                </div>
                                                <div onClick={this.handleCommentDelete} id={`comment-delete-button-${this.props.comment.id}`} className="comment-delete-button">
                                                    <div className="fa fa-pen-container">
                                                        <i className="fas fa-trash"></i>
                                                    </div>
                                                    Delete
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            ) }
                        </div>
                    </div>
                    <div className="comment-replies">

                    </div>
                </li>
            )
        }
    }
}

export default CommentIndexItem