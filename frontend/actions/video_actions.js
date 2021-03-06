import * as VideoAPIUtil from '../util/video_api_util'

export const RECEIVE_VIDEOS = 'RECEIVE_VIDEOS'
export const RECEIVE_VIDEO = 'RECEIVE_VIDEO'
export const DELETE_VIDEO = 'DELETE_VIDEO'
export const RECEIVE_VIDEO_ERRORS = 'RECEIVE_VIDEO_ERRORS'
export const CLEAR_VIDEO_ERRORS = 'CLEAR_VIDEO_ERRORS'

export const receiveVideos = videos => ({
    type: RECEIVE_VIDEOS,
    videos
})

export const receiveVideo = video => ({
    type: RECEIVE_VIDEO,
    video
})

export const deleteVideoAction = (video) => ({
    type: DELETE_VIDEO,
    video
})

export const receiveErrors = (errors) => ({
    type: RECEIVE_VIDEO_ERRORS,
    errors
})

export const clearErrors = () => ({
    type: CLEAR_VIDEO_ERRORS
})

export const searchVideos = (query) => dispatch => {
    return (
        VideoAPIUtil.searchVideos(query).then(videos => (
            dispatch(receiveVideos(videos))
        ), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
    )
};

export const fetchVideos = () => dispatch => {
    return (
        VideoAPIUtil.fetchVideos().then(videos => (
            dispatch(receiveVideos(videos))
        ), err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
    )
};

export const fetchVideo = (videoId) => dispatch => (
    VideoAPIUtil.fetchVideo(videoId).then(video => {
        dispatch(receiveVideo(video));
    }, err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);

export const createVideo = (video) => dispatch => {
    return (
        VideoAPIUtil.createVideo(video).then(video => {
            dispatch(receiveVideo(video))
        }, err => (
            dispatch(receiveErrors(err.responseJSON))
        ))
    )
};

export const updateVideo = (video, videoId) => dispatch => (
    VideoAPIUtil.updateVideo(video, videoId).then(video => (
        dispatch(receiveVideo(video))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);

export const updateVideoViews = (video) => dispatch => (
    VideoAPIUtil.updateVideoViews(video).then(video => (
        dispatch(receiveVideo(video))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
);

export const deleteVideo = (videoId) => dispatch => (
    VideoAPIUtil.deleteVideo(videoId).then((video) => (
        dispatch(deleteVideoAction(video))
    ), err => (
        dispatch(receiveErrors(err.responseJSON))
    ))
)