import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import { Route, Redirect, Switch } from "react-router-dom";
import { AuthRoute } from "../util/route_util"
import { ProtectedRoute } from "../util/protected_route_util"
import LoginFormContainer from "./session/login_form_container"
import SignupFormContainer from "./session/signup_form_container"
import VideoIndexContainer from "./video/video_index_container"
import CreateVideoFormContainer from "./video/create_video_form_container"

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
            <Switch>
                <AuthRoute exact path="/login" component={LoginFormContainer} />
                <AuthRoute exact path="/signup" component={SignupFormContainer} />
                <ProtectedRoute exact path="/upload" component={CreateVideoFormContainer} />
                <Route exact path='/' component={VideoIndexContainer} />
                <Route render={() => <Redirect to={{pathname: "/"}} />} />
                <Route path="*" component={VideoIndexContainer} />
            </Switch>
            </div>
        )
    }
}

export default App;