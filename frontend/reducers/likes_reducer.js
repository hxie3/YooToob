import { RECEIVE_LIKE, DELETE_LIKE } from "../actions/like_actions";

const likesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch (action.type) {
        case RECEIVE_LIKE:
            return Object.assign({}, state, action.like);
        case DELETE_LIKE:
            delete newState[Object.keys(action.comment)[0]];
            return newState
        default:
            return state
    }
};

export default likesReducer