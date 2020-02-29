import { RECEIVE_COMMENTS, RECEIVE_COMMENT, DELETE_COMMENT } from "../actions/comment_actions";

const commentsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    switch(action.type) {
        case RECEIVE_COMMENTS:
            return action.comments;
        case RECEIVE_COMMENT:
            return Object.assign({}, state, action.comment);
        case DELETE_COMMENT:
            delete newState[action.comment.id];
            return newState
        default:
            return state
    }
};

export default commentsReducer