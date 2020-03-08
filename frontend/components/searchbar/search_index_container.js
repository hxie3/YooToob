import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import { updateUser, clearErrors } from '../../actions/session_actions';
import SearchIndex from './search_index';

const mapStateToProps = (state, ownProps) => ({
    query: ownProps.match.params.query,
})

const mapDispatchToProps = dispatch => ({
    // clearErrors: () => dispatch(clearErrors())
    // search methods
})

export default withRouter(connect(
    mapStateToProps,
    // mapDispatchToProps,
    null
)(SearchIndex));