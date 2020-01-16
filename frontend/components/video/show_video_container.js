import { connect } from 'react-redux';
import ShowVideo from './show_video';
import { fetchVideo } from '../../actions/video_actions';
import { withRouter } from 'react-router-dom'

const mapStateToProps = (state, ownProps) => {
    return (
        {
            video: state.entities.videos[ownProps.match.params.id]
        }
    )
}


const mapDispatchToProps = dispatch => ({
    fetchVideo: (videoId) => dispatch(fetchVideo(videoId)),
})

export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(ShowVideo))