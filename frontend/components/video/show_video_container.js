import { connect } from 'react-redux';
import ShowVideo from './show_video';
import { fetchVideo, fetchVideos, updateVideo } from '../../actions/video_actions';
import { fetchComments } from '../../actions/comment_actions';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';


const mapStateToProps = (state, ownProps) => {
    // const videos = Object.values(state.entities.videos)
    const comments = Object.values(state.entities.comments).filter((comment) => comment.videoId === Number(ownProps.match.params.id));
    return (
        {
            video: state.entities.videos[ownProps.match.params.id],
            videos: state.entities.videos,
            videoId: ownProps.match.params.id,
            currentUser: state.entities.users[state.session.id],
            comments
        }
    )
}


const mapDispatchToProps = dispatch => ({
    fetchVideo: (videoId) => dispatch(fetchVideo(videoId)),
    fetchVideos: () => dispatch(fetchVideos()),
    fetchComments: () => dispatch(fetchComments()),
    incrementViews: video => dispatch(updateVideo(video)),
    openModal: str => dispatch(openModal(str)),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowVideo))