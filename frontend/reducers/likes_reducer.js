import { RECEIVE_LIKE, DELETE_LIKE } from "../actions/like_actions";
import { RECEIVE_VIDEO } from "../actions/video_actions";

const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_LIKE:
            return Object.assign({}, state, action.like);
        case RECEIVE_VIDEO:
            newState = Object.assign({}, state, action.video).like
            if (newState) return newState;
            return {}
        case DELETE_LIKE:
            return {}
        default:
            return state
    }
};

export default likesReducer