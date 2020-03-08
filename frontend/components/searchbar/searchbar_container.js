import { connect } from 'react-redux';
// import { updateUser, clearErrors } from '../../actions/session_actions';
import SearchBar from './searchbar';
// import { withRouter } from 'react-router-dom'; 

// const mapStateToProps = (state, ownProps) => {
//     return ({
//         user: state.entities.users[state.session.id],
//     })
// }

// const mapDispatchToProps = dispatch => ({
//     // processForm: (user) => dispatch(updateUser(user)),
//     // closeModal: () => dispatch(closeModal()),
//     // clearErrors: () => dispatch(clearErrors())
// })

export default (connect(
    // mapStateToProps,
    // mapDispatchToProps
    null,
    null
)(SearchBar))