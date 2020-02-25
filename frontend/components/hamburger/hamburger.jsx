import React from "react";
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom"

class Hamburger extends React.Component {
    constructor(props) {
        super(props);

        this.handleHamburger = this.handleHamburger.bind(this);
    }

    componentDidMount() {
        library.add(fas, fab)
        const hamburger = findIconDefinition({ prefix: 'fas', iconName: 'bars' });
        const hamburgerIcon = icon(hamburger);
        Array.from(hamburgerIcon.node).map(n => document.getElementsByClassName('hamburger')[0].appendChild(n))
        const yootoob = findIconDefinition({ prefix: 'fab', iconName: 'youtube' });
        const yootoobIcon = icon(yootoob);
        Array.from(yootoobIcon.node).map(n => document.getElementsByClassName('logo-icon')[0].appendChild(n))
    }

    handleHamburger(e) {
        e.preventDefault();
        if (window.location.hash === '#/') {
            document.getElementsByClassName('sidenav')[0].classList.toggle('hidden');
            document.getElementsByClassName('sidenav2')[0].classList.toggle('hidden');
        } else {
            this.props.openModal('sidenav');
            // document.getElementsByClassName('sidenav3')[0].classList.toggle('hidden')
        }
    }

    render() {
        return(
            <div className="hamburger-logo">
                <div className='hamburger' onClick={this.handleHamburger}></div>
                <Link to='/' className='logo'><div className='logo-icon'></div>YooToob</Link>
            </div>
        )
    }
}

export default Hamburger;