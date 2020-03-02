import { connect } from 'react-redux';
import ShowVideo from './show_video';
import { fetchVideo, fetchVideos, updateVideo } from '../../actions/video_actions';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';


const mapStateToProps = (state, ownProps) => {
    // const videos = Object.values(state.entities.videos)
    return (
        {
            video: state.entities.videos[ownProps.match.params.id],
            videos: state.entities.videos,
            videoId: ownProps.match.params.id,
            currentUser: state.entities.users[state.session.id]
        }
    )
}


const mapDispatchToProps = dispatch => ({
    fetchVideo: (videoId) => dispatch(fetchVideo(videoId)),
    fetchVideos: () => dispatch((fetchVideos())),
    incrementViews: video => dispatch(updateVideo(video)),
    openModal: str => dispatch(openModal(str)),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowVideo))