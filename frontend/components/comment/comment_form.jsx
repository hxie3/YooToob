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
    }

    updateBody(e) {
        let newCommentState = Object.assign({}, this.state.comment);
        newCommentState.body = e.currentTarget.value;
        this.setState({ comment: newCommentState })
    }

    render() {
        return (
            <div className="comment-form">
                <div>
                    <img className="comment-profile-picture" src={this.props.comment.profilePicture} alt="profile-picture"/>
                </div>
                <div className="comment-form-body-container">
                    <textarea className="comment-form-body-textarea" onChange={this.updateBody} value={this.state.comment.body} placeholder="Add a public comment..."></textarea>
                </div>
            </div>
        )
    }
}

export default CommentForm;