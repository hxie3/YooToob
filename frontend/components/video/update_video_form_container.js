import { connect } from 'react-redux';
import UpdateVideoForm from './update_video_form';
import { updateVideo, fetchVideo, clearErrors } from '../../actions/video_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => ({
    video: state.entities.videos[ownProps.match.params.videoId],
})

const mapDispatchToProps = (dispatch) => ({
    fetchVideo: videoId => dispatch(fetchVideo(videoId)),
    clearErrors: () => dispatch(clearErrors()),
    closeModal: () => dispatch(closeModal()),
    processForm: video => dispatch(updateVideo(video))
})

export default withRouter(connect(
    mapStateToProps, 
    mapDispatchToProps
)(UpdateVideoForm));