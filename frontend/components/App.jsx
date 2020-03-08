import React from "react";
import GreetingContainer from "./greeting/greeting_container";
import HamburgerContainer from "./hamburger/hamburger_container";
import SearchBarContainer from "./searchbar/searchbar_container";
import SearchIndexContainer from "./searchbar/search_index_container";
import { Route, Redirect, Switch } from "react-router-dom";
import VideoIndexContainer from "./video/video_index_container";
import Modal from "./modal/modal";
import ShowVideoContainer from "./video/show_video_container";

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Modal />
                <header className='header'>
                    <HamburgerContainer />
                    <SearchBarContainer />
                    <div className='greeting'>
                        <GreetingContainer />
                    </div>
                </header>
                <br/>
                <Switch>
                    <Route exact path='/' component={VideoIndexContainer} />
                    <Route exact path='/watch/:id' component={ShowVideoContainer} />
                    <Route exact path='/search/:query' component={SearchIndexContainer} />
                    <Route render={() => <Redirect to={{pathname: "/"}} />} />
                </Switch>
                
            </div>
        )
    }
}

export default (App);