import { connect } from 'react-redux';
import UpdateCommentForm from './update_comment_form';
import { updateComment, clearErrors } from '../../actions/comment_actions';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => ({
    comment: ownProps.comment,
    errors: state.errors.comments,
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    processForm: (comment) => dispatch(updateComment(comment)),
    clearErrors: () => dispatch(clearErrors()),
    handleCancelChild: () => ownProps.cancelEdit()
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(UpdateCommentForm));