import { connect } from 'react-redux';
import { updateVideoViews } from '../../actions/video_actions'
import VideoIndexItem from './video_index_item';

const mapStateToProps = (state, ownProps) => ({
    video: ownProps.video
})

const mapDispatchToProps = dispatch => ({
    incrementViews: video => dispatch(updateVideoViews(video))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoIndexItem);