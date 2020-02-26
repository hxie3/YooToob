import { connect } from 'react-redux';
import ProfilePicture from './profile_picture';
import { updateUser, clearErrors } from '../../actions/session_actions';
import { closeModal } from '../../actions/modal_actions'

const mapStateToProps = (state) => ({
    user: state.entities.users[state.session.id],
    errors: state.errors.session
})

const mapDispatchToProps = dispatch => ({
    processForm: (user) => dispatch(updateUser(user)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfilePicture)