import { connect } from 'react-redux';
import { updateComment } from '../../actions/comment_actions'
import CommentIndexItem from './comment_index_item';

const mapStateToProps = (state, ownProps) => ({
    comment: ownProps.comment,
    currentUser: state.session.id
})

const mapDispatchToProps = dispatch => ({
    updateComment: (comment) => dispatch(updateComment(comment))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentIndexItem);