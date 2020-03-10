import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { searchVideos } from '../../actions/video_actions' 
// import { updateUser, clearErrors } from '../../actions/session_actions';
import SearchIndex from './search_index';

const mapStateToProps = (state, ownProps) => {
    return({
        query: ownProps.match.params.query.split('+').map(part => decodeURIComponent(part)).join('%'),
    })
}

const mapDispatchToProps = dispatch => ({
    // clearErrors: () => dispatch(clearErrors())
    // search methods
    searchVideos: (query) => dispatch(searchVideos(query))
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps,
)(SearchIndex));