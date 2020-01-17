import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store'
import Root from './components/root'

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

    ReactDOM.render(<Root store={store} />, root);
})