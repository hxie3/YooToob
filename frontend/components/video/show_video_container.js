import { connect } from 'react-redux';
import ShowVideo from './show_video';
import { fetchVideo, fetchVideos, updateVideoViews, deleteVideo } from '../../actions/video_actions';
import { createLike, updateLike, deleteLike } from '../../actions/like_actions';
import { fetchComments } from '../../actions/comment_actions';
import { withRouter } from 'react-router-dom';
import { openModal } from '../../actions/modal_actions';


const mapStateToProps = (state, ownProps) => {
    // const videos = Object.values(state.entities.videos)
    const comments = Object.values(state.entities.comments).filter((comment) => comment.videoId === Number(ownProps.match.params.id));
    const like = Object.values(state.entities.likes)[0];
    return (
        {
            video: state.entities.videos[ownProps.match.params.id],
            videos: state.entities.videos,
            videoId: ownProps.match.params.id,
            currentUser: state.entities.users[state.session.id],
            like,
            comments
        }
    )
}


const mapDispatchToProps = dispatch => ({
    fetchVideo: (videoId) => dispatch(fetchVideo(videoId)),
    fetchVideos: () => dispatch(fetchVideos()),
    deleteVideo: (videoId) => dispatch(deleteVideo(videoId)),
    fetchComments: () => dispatch(fetchComments()),
    incrementViews: video => dispatch(updateVideoViews(video)),
    createLike: like => dispatch(createLike(like)),
    updateLike: like => dispatch(updateLike(like)),
    deleteLike: likeId => dispatch(deleteLike(likeId)),
    openModal: (str, video) => dispatch(openModal(str, video)),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowVideo))