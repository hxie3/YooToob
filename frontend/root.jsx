import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'
import Root from './components/root'
import { login, logout, signup } from './actions/session_actions';

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");
    let store;  
    if (window.user) {
        const preloadedState = {
            entities: {
                users: { [window.user.id]: window.user }
            },
            session: { id: window.user.id }
        };
        store = configureStore(preloadedState);
        delete window.user;
    } else {
        store = configureStore();
    }
    // Testing
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    window.login = login;
    window.logout = logout;
    window.signup = signup;

    ReactDOM.render(<Root store={store} />, root);
})