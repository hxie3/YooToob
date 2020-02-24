import { connect } from 'react-redux';
import VideoForm from './video_form';
import { createVideo, clearErrors } from '../../actions/video_actions';
import { closeModal } from '../../actions/modal_actions'

const mapStateToProps = (state) => ({
    video: {
        title: '',
        description: '',
        user_id: state.session.id,
        videoUrl: '',
        videoFile: null,
    },
    errors: state.errors.videos,
    formType: 'Create Video'
})

const mapDispatchToProps = dispatch => ({
    processForm : (video) => dispatch(createVideo(video)),
    closeModal: () => dispatch(closeModal()),
    clearErrors: () => dispatch(clearErrors())
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoForm)