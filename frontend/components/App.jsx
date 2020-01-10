import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import { Route } from "react-router-dom";
import { AuthRoute } from "../util/route_util"
import LoginFormContainer from "./session/login_form_container"
import SignupFormContainer from "./session/signup_form_container"
import VideoIndexContainer from "./video/video_index_container"

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <header className='header'>
                    <h1>YooToob</h1>
                    <div className='greeting'>
                        <GreetingContainer />
                    </div>
                </header>

                <AuthRoute path="/login" component={LoginFormContainer} />
                <AuthRoute path="/signup" component={SignupFormContainer} />
                <Route exact path='/' component={VideoIndexContainer} />
            </div>
        )
    }
}

export default App;