import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import HamburgerContainer from "./hamburger/hamburger_container";
import { Route, Redirect, Switch } from "react-router-dom";
import { AuthRoute } from "../util/route_util";
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import VideoIndexContainer from "./video/video_index_container";
import Modal from "./modal/modal";
import ShowVideoContainer from "./video/show_video_container";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleSearchFocus = this.handleSearchFocus.bind(this);
    }

    componentDidMount(){
        library.add(fas, fab)
        const search = findIconDefinition({ prefix: 'fas', iconName: 'search' });
        const searchIcon = icon(search);
        Array.from(searchIcon.node).map(n => document.getElementsByClassName('search-button')[0].appendChild(n))
    }

    handleSearchFocus(e){
        e.preventDefault();
        document.getElementsByClassName('searchbar-container')[0].classList.toggle('searchbar-container-focus')
    }

    render() {
        return (
            <div>
                <Modal />
                <header className='header'>
                    <HamburgerContainer />
                    <div className='searchbar-container-button-container'>
                        <div className='searchbar-container'>
                            <input className='searchbar' type="text" placeholder='Search' onFocus={this.handleSearchFocus} onBlur={this.handleSearchFocus}/>     
                        </div>
                        <button className='search-button'></button>
                    </div>
                    <div className='greeting'>
                        <GreetingContainer />
                    </div>
                </header>
                <br/>
                <Switch>
                    <AuthRoute exact path="/login" component={LoginFormContainer} />
                    <AuthRoute exact path="/signup" component={SignupFormContainer} />
                    <Route exact path='/' component={VideoIndexContainer} />
                    <Route exact path='/watch/:id' component={ShowVideoContainer} />
                    <Route render={() => <Redirect to={{pathname: "/"}} />} />
                </Switch>
                
            </div>
        )
    }
}

export default App;