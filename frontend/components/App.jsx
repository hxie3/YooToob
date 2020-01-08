import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import { Route } from "react-router-dom";
import { AuthRoute } from "../util/route_util"
import LoginFormContainer from "./session/login_form_container"
import SignupFormContainer from "./session/signup_form_container"

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        let greeting;
        if (!!this.props.user){
            greeting = <div>
                Welcome {this.props.user.username}
                <button onClick={this.handleLogout}>Log Out</button>
            </div>;
        } else {
            greeting = <Route exact path='/' component={GreetingContainer} />
        }
        return (
            <div>
                <header className='header'>
                    <h1>YooToob</h1>
                    <div className='greeting'>
                        {greeting}
                    </div>
                        
                </header>

                <AuthRoute path="/login" component={LoginFormContainer} />
                <AuthRoute path="/signup" component={SignupFormContainer} />
            </div>
        )
    }
}

export default App;