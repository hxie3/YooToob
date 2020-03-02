import { connect } from 'react-redux';
import CommentForm from './comment_form';
import { createComment, clearErrors } from '../../actions/comment_actions';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => ({
    comment: {
        body: '',
        user_id: state.session.id,
        video_id: ownProps.match.params.id,
        profilePicture: state.entities.users[state.session.id].profilePicture,
        username: state.entities.users[state.session.id].username
    },
    errors: state.errors.comments,
})

const mapDispatchToProps = dispatch => ({
    processForm: (comment) => dispatch(createComment(comment)),
    clearErrors: () => dispatch(clearErrors())
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(CommentForm));