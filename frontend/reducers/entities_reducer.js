import { combineReducers } from "redux";

import usersReducer from "./users_reducer";
import videosReducer from "./videos_reducer";
import commentsReducer from "./comments_reducer";
import likesReducer from "./likes_reducer";

const entitiesReducer = combineReducers({
    users: usersReducer,
    likes: likesReducer,
    videos: videosReducer,
    comments: commentsReducer,
});

export default entitiesReducer;