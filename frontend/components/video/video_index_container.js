import { connect } from 'react-redux';
import { fetchVideos } from '../../actions/video_actions'
import VideoIndex from './video_index';

const mapStateToProps = state => ({
    videos: state.entities.videos
})

const mapDispatchToProps = dispatch => ({
    fetchVideos: () => dispatch(fetchVideos())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoIndex);