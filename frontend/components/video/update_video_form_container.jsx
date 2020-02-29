import { connect } from 'react-redux';
import React from 'react';
import UpdateVideoForm from './update_video_form';
import { updateVideo, fetchVideo } from '../../actions/video_actions'
import { closeModal } from '../../actions/modal_actions'

const mapStateToProps = (state, ownProps) => ({
    video: state.entities.videos[ownProps.match.params.videoId],
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