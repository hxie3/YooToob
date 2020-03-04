import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

class CommentIndexItem extends React.Component {
    constructor(props) {
        super(props)

        this.state = this.props.comment;
        this.handleReadMore = this.handleReadMore.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
    }

    componentDidMount() {
        let commentBody = document.getElementById(`comment-${this.props.comment.id}`);
        let readMore = document.getElementById(`read-${this.props.comment.id}`);
        if (commentBody.offsetHeight < 96) {
            readMore.classList.add("hidden");
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
        document.getElementById(`edit-${this.props.comment.id}`).classList.remove("hidden");
    }

    handleMouseLeave(e) {
        e.preventDefault();
        if (!Array.from(document.getElementById(`edit-${this.props.comment.id}`).classList).includes("active")) {
            document.getElementById(`edit-${this.props.comment.id}`).classList.add("hidden");
        }
    }

    handleDropdown(e) {
        e.preventDefault();
        document.getElementById(`comment-edit-${this.props.comment.id}`).classList.toggle("hidden");
        document.getElementById(`edit-${this.props.comment.id}`).classList.toggle("active");
    }

    render() {
        let date = new Date(this.props.comment.created_at);
        let now = new Date(Date.now());
        let diffInSeconds = Math.floor((now - date) / 1000);
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
            <li onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} className="comment-index-item">
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
                            </div>
                        </div>
                        <div onClick={this.handleDropdown} id={`edit-${this.props.comment.id}`} className="edit-comment fa hidden">
                            <i className="fas fa-ellipsis-v"></i>
                            <div id={`comment-edit-${this.props.comment.id}`} className="comment-edit-dropdown hidden">
                                <div className="inside-dropdown">
                                    <div id={`comment-edit-button-${this.props.comment.id}`} className="comment-edit-button">
                                        Edit
                                    </div>
                                    <div id={`comment-delete-button-${this.props.comment.id}`} className="comment-delete-button">
                                        Delete
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="comment-replies">

                </div>
            </li>
        )
    }
}

export default CommentIndexItem