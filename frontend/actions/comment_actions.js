import * as CommentAPIUtil from '../util/comment_api_util';

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS';
export const RECEIVE_COMMENT = 'RECEIVE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const RECEIVE_COMMENT_ERRORS = 'RECEIVE_COMMENT_ERRORS';
export const CLEAR_COMMENT_ERRORS = 'CLEAR_COMMENT_ERRORS';

export const receiveComments = comments => {
    return (
        {
            type: RECEIVE_COMMENTS,
            comments
        }
    )
}

export const receiveComment = comment => {
    return (
        {
            type: RECEIVE_COMMENT,
            comment
        }
    )
}

export const deleteCommentAction = comment => {
    return (
        {
            type: DELETE_COMMENT,
            comment
        }
    )
}

export const receiveErrors = errors => {
    return (
        {
            type: RECEIVE_COMMENT_ERRORS,
            errors
        }
    )
}

export const clearErrors = () => {
    return (
        {
            type: CLEAR_COMMENT_ERRORS,
        }
    )
}

export const fetchComments = () => dispatch => {
    return (
        CommentAPIUtil.fetchComments().then(comments => (
            dispatch(receiveComments(comments))
        ), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
    )
};

export const fetchComment = (commentId) => dispatch => {
    return (
        CommentAPIUtil.fetchComment(commentId).then(comment => {
            dispatch(receiveComment(comment));
        }, err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
    )
}

export const createComment = comment => dispatch => {
    return (
        CommentAPIUtil.createComment(comment).then(comment => {
            dispatch(receiveComment(comment))
        }, err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
    )
};

export const updateComment = comment => dispatch => (
    CommentAPIUtil.updateComment(comment).then(comment => (
        dispatch(receiveComment(comment))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
)

export const deleteComment = commentId => dispatch => (
    CommentAPIUtil.deleteComment(commentId).then(comment => (
        dispatch(deleteCommentAction(comment))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
)