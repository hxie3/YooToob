import { connect } from 'react-redux';
import UpdateVideoForm from './update_video_form';
import { updateVideo, fetchVideo, clearErrors } from '../../actions/video_actions';
import { closeModal } from '../../actions/modal_actions';
import { withRouter } from 'react-router-dom';

const mapStateToProps = (state, ownProps) => {
    return ({
        video: {
            id: ownProps.video.id,
            title: ownProps.video.title,
            description: ownProps.video.description,
            user_id: state.session.id,
            videoUrl: ownProps.video.video,
            photoUrl: ownProps.video.thumbnail,
            photoFile: ownProps.video.thumbnailFile
        },
        errors: state.errors.videos,
    })
}

const mapDispatchToProps = (dispatch) => ({
    fetchVideo: videoId => dispatch(fetchVideo(videoId)),
    clearErrors: () => dispatch(clearErrors()),
    closeModal: () => dispatch(closeModal()),
    processForm: (video, videoId) => dispatch(updateVideo(video, videoId))
})

export default withRouter(connect(
    mapStateToProps, 
    mapDispatchToProps
)(UpdateVideoForm));