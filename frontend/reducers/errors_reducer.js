import { combineReducers } from "redux";

import sessionErrorsReducer from "./session_errors_reducer";
import videos from "./video_errors_reducer";
import comments from "./comment_errors_reducer";

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    videos,
    comments
});

export default errorsReducer;