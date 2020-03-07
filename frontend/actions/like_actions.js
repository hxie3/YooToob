import * as LikeAPIUtil from '../util/like_api_util';

export const RECEIVE_LIKE = 'RECEIVE_LIKE';
export const DELETE_LIKE = 'DELETE_LIKE';

export const receiveLike = like => {
    return (
        {
            type: RECEIVE_LIKE,
            like
        }
    )
}

export const deleteLikeAction = like => {
    return (
        {
            type: DELETE_LIKE,
            like
        }
    )
}

export const createLike = like => dispatch => {
    return (
        LikeAPIUtil.createLike(like).then(like => {
            dispatch(receiveLike(like))
        })
    )
};

export const updateLike = like => dispatch => (
    LikeAPIUtil.updateLike(like).then(like => (
        dispatch(receiveLike(like))
    ))
)

export const deleteLike = likeId => dispatch => (
    LikeAPIUtil.deleteLike(likeId).then(like => (
        dispatch(deleteLikeAction(like))
    ))
)