import React from 'react';
import CommentIndexItemContainer from './comment_index_item_container';

class UpdateCommentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: this.props.comment,
            edit: true,
        }

        this.updateBody = this.updateBody.bind(this);
        this.focusBody = this.focusBody.bind(this);
        this.unfocusBody = this.unfocusBody.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.comment.video_id !== prevState.comment.video_id) {
            return { comment: nextProps.comment };
        }
        else return null;
    }

    componentDidUpdate(prevProps) {
        if (this.props.comment) {
            if (prevProps.comment.video_id !== this.props.comment.video_id) {
                //Perform some operation here
                let newCommentState = Object.assign({}, this.state.comment);
                newCommentState.body = '';
                this.setState({ comment: newCommentState })
                document.getElementById(`comment-buttons-${this.props.comment.id}`).classList.add('hidden');
                document.getElementById(`comment-form-body-textarea-${this.props.comment.id}`).style.height = 'auto';
            }
        }
    }

    updateBody(e) {
        let newCommentState = Object.assign({}, this.state.comment);
        newCommentState.body = e.currentTarget.value;
        this.setState({ comment: newCommentState })
        e.currentTarget.style.height = 'auto';
        e.currentTarget.style.height = e.currentTarget.scrollHeight - 4 + 'px';
        let submit = document.getElementById(`comment-submit-${this.props.comment.id}`);
        if (e.currentTarget.value.trim() === '' || e.currentTarget.value.trim() === this.props.comment.body ) {
            submit.disabled = true;
        } else {
            submit.disabled = false;
            submit.addEventListener("click", this.handleSubmit, false)
        }
    }

    componentDidMount() {
        document.getElementById(`comment-form-body-textarea-${this.props.comment.id}`).style.height = document.getElementById(`comment-form-body-textarea-${this.props.comment.id}`).scrollHeight - 4 + 'px';
    }

    handleCancel(e) {
        e.preventDefault();
        this.props.handleCancelChild();
    }

    focusBody(e) {
        e.preventDefault();
        if (e.currentTarget.value === '') {
            document.getElementById(`comment-submit-${this.props.comment.id}`).disabled = true;
        }
        document.getElementById(`comment-form-body-container-${this.props.comment.id}`).style.borderBottom = "1px solid black";
        document.getElementById(`comment-buttons-${this.props.comment.id}`).classList.remove('hidden');
    }

    unfocusBody(e) {
        e.preventDefault();
        document.getElementById(`comment-form-body-container-${this.props.comment.id}`).style.borderBottom = "1px solid rgba(0, 0, 0, 0.1)";
    }

    handleSubmit(e) {
        e.preventDefault();
        let submitCommentState = Object.assign({}, this.state.comment);
        delete submitCommentState.profilePicture;
        delete submitCommentState.username;
        submitCommentState.body = this.state.comment.body.trim();
        this.props.processForm(submitCommentState);
        this.handleCancel(e);
    }

    render() {
        if (this.state.edit) {
            return (
                <div id={`update-comment-form-${this.props.comment.id}`} className="comment-form">
                    <div>
                        <img className="comment-profile-picture" src={this.props.comment.profilePicture} alt="profile-picture" />
                    </div>
                    <div className="column">
                        <div id={`comment-form-body-container-${this.props.comment.id}`} className="comment-form-body-container">
                            <textarea autoFocus id={`comment-form-body-textarea-${this.props.comment.id}`} onBlur={this.unfocusBody} onFocus={this.focusBody} className="comment-form-body-textarea" onChange={this.updateBody} value={this.state.comment.body} placeholder="Add a public comment..."></textarea>
                        </div>
                        <div id={`comment-buttons-${this.props.comment.id}`} className="comment-buttons hidden">
                            <button onClick={this.handleCancel} className="comment-cancel">
                                <span className="comment-cancel-text">
                                    CANCEL
                                </span>
                            </button>
                            <button disabled onSubmit={this.handleSubmit} id={`comment-submit-${this.props.comment.id}`} className="comment-submit">
                                <span className="comment-submit-text">
                                    SAVE
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <CommentIndexItemContainer comment={this.props.comment}/>
        }
    }
}

export default UpdateCommentForm;