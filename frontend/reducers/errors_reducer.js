import { combineReducers } from "redux";

import sessionErrorsReducer from "./session_errors_reducer";
import videos from "./video_errors_reducer"

const errorsReducer = combineReducers({
    session: sessionErrorsReducer,
    videos
});

export default errorsReducer;