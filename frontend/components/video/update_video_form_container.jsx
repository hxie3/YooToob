import { connect } from 'react-redux';
import React from 'react';
import VideoForm from './video_form';
import { updateVideo, fetchVideo } from '../../actions/video_actions'
import { closeModal } from '../../actions/modal_actions'

class UpdateVideoForm extends React.Component {
    componentDidMount() {
        this.props.fetchVideo(this.props.match.params.videoId);
    }

    render() {
        const { action, formType, video } = this.props;
        if (!video) return null;
        return (
            <VideoForm
                action={action}
                formType={formType}
                video={video} />
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    video: state.entities.videos[ownProps.mathch.params.videoId],
    formType: 'Update Video'
})

const mapDispatchToProps = (dispatch) => ({
    fetchVideo: videoId => dispatch(fetchVideo(videoId)),
    closeModal: () => dispatch(closeModal()),
    processForm: video => dispatch(updateVideo(video))
})

export default connect (
    mapStateToProps, 
    mapDispatchToProps
)(UpdateVideoForm)