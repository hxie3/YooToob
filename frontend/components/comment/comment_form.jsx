import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'

class CommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: this.props.comment,
        }

        this.updateBody = this.updateBody.bind(this);
        this.focusBody = this.focusBody.bind(this);
        this.unfocusBody = this.unfocusBody.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    updateBody(e) {
        let newCommentState = Object.assign({}, this.state.comment);
        newCommentState.body = e.currentTarget.value;
        this.setState({ comment: newCommentState })
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight - 4 + 'px';
        let submit = document.getElementsByClassName("comment-submit")[0];
        if (e.currentTarget.value === '') {
            submit.disabled = true;
        } else {
            submit.disabled = false;
            submit.addEventListener("click", this.handleSubmit, false)
        }
    }

    handleCancel(e) {
        e.preventDefault();
        let newCommentState = Object.assign({}, this.state.comment);
        newCommentState.body = '';
        this.setState({ comment: newCommentState })
        document.getElementsByClassName('comment-buttons')[0].classList.add('hidden');
        document.getElementsByClassName('comment-form-body-textarea')[0].style.height = '42px';
    }

    focusBody(e) {
        e.preventDefault();
        if (e.currentTarget.value === '') {
            document.getElementsByClassName("comment-submit")[0].disabled = true;
        }
        document.getElementsByClassName("comment-form-body-container")[0].style.borderBottom = "1px solid black";
        document.getElementsByClassName('comment-buttons')[0].classList.remove('hidden');
    }

    unfocusBody(e) {
        e.preventDefault();
        document.getElementsByClassName("comment-form-body-container")[0].style.borderBottom = "1px solid rgba(0, 0, 0, 0.1)";
    }

    handleSubmit(e) {
        e.preventDefault();
        let submitCommentState = Object.assign({}, this.state.comment);
        delete submitCommentState.profilePicture;
        delete submitCommentState.username;
        this.props.processForm(submitCommentState);
        let newCommentState = Object.assign({}, this.state.comment);
        newCommentState.body = '';
        this.setState({ comment: newCommentState })
        document.getElementsByClassName("comment-form-body-container")[0].style.borderBottom = "1px solid rgba(0, 0, 0, 0.1)";
        document.getElementsByClassName('comment-buttons')[0].classList.add('hidden');
        document.getElementsByClassName('comment-form-body-textarea')[0].style.height = '42px';
    }

    render() {
        return (
            <div className="comment-form">
                <div>
                    <img className="comment-profile-picture" src={this.props.comment.profilePicture} alt="profile-picture"/>
                </div>
                <div className="column">
                    <div className="comment-form-body-container">
                        <textarea onBlur={this.unfocusBody} onFocus={this.focusBody} className="comment-form-body-textarea" onChange={this.updateBody} value={this.state.comment.body} placeholder="Add a public comment..."></textarea>
                    </div>
                    <div className="comment-buttons hidden">
                        <button onClick={this.handleCancel} className="comment-cancel">
                            <span className="comment-cancel-text">
                                CANCEL
                            </span>
                        </button>
                        <button disabled onSubmit={this.handleSubmit} className="comment-submit">
                            <span className="comment-submit-text">
                                COMMENT
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentForm;