import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import { Route, Redirect, Switch } from "react-router-dom";
import { AuthRoute } from "../util/route_util"
import { ProtectedRoute } from "../util/protected_route_util"
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import LoginFormContainer from "./session/login_form_container"
import SignupFormContainer from "./session/signup_form_container"
import VideoIndexContainer from "./video/video_index_container"
import CreateVideoFormContainer from "./video/create_video_form_container"
import SideNav from "./sidenav/sidenav"
import Modal from "./modal/modal"

class App extends React.Component {
    constructor(props) {
        super(props);

        this.handleSearchFocus = this.handleSearchFocus.bind(this);
        this.handleHamburger = this.handleHamburger.bind(this)
    }

    componentDidMount(){
        library.add(fas, fab)
        const hamburger = findIconDefinition({ prefix: 'fas', iconName: 'bars' });
        const hamburgerIcon = icon(hamburger);
        Array.from(hamburgerIcon.node).map(n => document.getElementsByClassName('hamburger')[0].appendChild(n))
        const yootoob = findIconDefinition({ prefix: 'fab', iconName: 'youtube' });
        const yootoobIcon = icon(yootoob);
        Array.from(yootoobIcon.node).map(n => document.getElementsByClassName('logo-icon')[0].appendChild(n))
        const search = findIconDefinition({ prefix: 'fas', iconName: 'search' });
        const searchIcon = icon(search);
        Array.from(searchIcon.node).map(n => document.getElementsByClassName('search-button')[0].appendChild(n))
    }

    handleSearchFocus(e){
        e.preventDefault();
        document.getElementsByClassName('searchbar-container')[0].classList.toggle('searchbar-container-focus')
    }

    handleHamburger(e){
        e.preventDefault();
        if (window.location.hash === '#/') {
            document.getElementsByClassName('sidenav')[0].classList.toggle('hidden')
            document.getElementsByClassName('sidenav2')[0].classList.toggle('hidden')
        } else {
            document.getElementsByClassName('sidenav3')[0].classList.toggle('hidden')
        }
    }

    render() {
        return (
            <div>
                <Modal />
                <header className='header'>
                    <div className='hamburger-logo'>
                        <div className='hamburger' onClick={this.handleHamburger}></div>
                        <Link to='/' className='logo'><div className='logo-icon'></div>YooToob</Link>
                    </div>
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
                    <Switch>
                        <AuthRoute exact path="/login" component={LoginFormContainer} />
                        <AuthRoute exact path="/signup" component={SignupFormContainer} />
                        <Route exact path='/' component={VideoIndexContainer} />
                        <Route render={() => <Redirect to={{pathname: "/"}} />} />
                    </Switch>
                
            </div>
        )
    }
}

export default App;