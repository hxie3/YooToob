import { connect } from 'react-redux';
import { updateComment, deleteComment, fetchComment } from '../../actions/comment_actions';
import { createLike, updateLike, deleteLike } from '../../actions/like_actions';
import { openModal } from '../../actions/modal_actions';
import CommentIndexItem from './comment_index_item';

const mapStateToProps = (state, ownProps) => {
    let like;
    if (ownProps.comment.like) {
        like = Object.values(ownProps.comment.like)[0]
    }
    return ({
        comment: ownProps.comment,
        currentUser: state.session.id,
        like
    })
}


const mapDispatchToProps = dispatch => ({
    fetchComment: (commentId) => dispatch(fetchComment(commentId)),
    updateComment: (comment) => dispatch(updateComment(comment)),
    deleteComment: (commentId) => dispatch(deleteComment(commentId)),
    createLike: (like) => dispatch(createLike(like)),
    updateLike: (like) => dispatch(updateLike(like)),
    deleteLike: (likeId) => dispatch(deleteLike(likeId)),
    openModal: (str) => dispatch(openModal(str)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentIndexItem);