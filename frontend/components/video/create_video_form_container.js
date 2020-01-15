import { connect } from 'react-redux';
import VideoForm from './video_form';
import { createVideo } from '../../actions/video_actions';
import { closeModal } from '../../actions/modal_actions'

const mapStateToProps = (state) => ({
    video: {
        title: '',
        description: '',
        user_id: state.session.id,
        videoUrl: '',
        videoFile: null,
    },
    formType: 'Create Video'
})

const mapDispatchToProps = dispatch => ({
    processForm : (video) => dispatch(createVideo(video)),
    closeModal: () => dispatch(closeModal()),
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(VideoForm)