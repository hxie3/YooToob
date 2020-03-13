import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom"

class SideNav extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: this.props.modal
        }
    }

    componentDidMount() {
        library.add(fas, fab)
        const home = findIconDefinition({ prefix: 'fas', iconName: 'home' });
        const homeIcon = icon(home);
        Array.from(homeIcon.node).map(n => document.getElementsByClassName('home-icon')[0].appendChild(n))
        Array.from(homeIcon.node).map(n => document.getElementsByClassName('home-icon2')[0].appendChild(n))
        Array.from(homeIcon.node).map(n => document.getElementsByClassName('home-icon3')[0].appendChild(n))
        const github = findIconDefinition({ prefix: 'fab', iconName: 'github' });
        const githubIcon = icon(github);
        Array.from(githubIcon.node).map(n => document.getElementsByClassName('github-icon')[0].appendChild(n))
        Array.from(githubIcon.node).map(n => document.getElementsByClassName('github-icon2')[0].appendChild(n))
        Array.from(githubIcon.node).map(n => document.getElementsByClassName('github-icon3')[0].appendChild(n))
        const linkedin = findIconDefinition({ prefix: 'fab', iconName: 'linkedin' });
        const linkedinIcon = icon(linkedin);
        Array.from(linkedinIcon.node).map(n => document.getElementsByClassName('linkedin-icon')[0].appendChild(n))
        Array.from(linkedinIcon.node).map(n => document.getElementsByClassName('linkedin-icon2')[0].appendChild(n))
        Array.from(linkedinIcon.node).map(n => document.getElementsByClassName('linkedin-icon3')[0].appendChild(n))
        const angellist = findIconDefinition({ prefix: 'fab', iconName: 'angellist' });
        const angellistIcon = icon(angellist);
        Array.from(angellistIcon.node).map(n => document.getElementsByClassName('angellist-icon')[0].appendChild(n))
        Array.from(angellistIcon.node).map(n => document.getElementsByClassName('angellist-icon2')[0].appendChild(n))
        Array.from(angellistIcon.node).map(n => document.getElementsByClassName('angellist-icon3')[0].appendChild(n))
        const hamburger = findIconDefinition({ prefix: 'fas', iconName: 'bars' });
        const hamburgerIcon = icon(hamburger);
        Array.from(hamburgerIcon.node).map(n => document.getElementsByClassName('hamburger2')[0].appendChild(n))
        const yootoob = findIconDefinition({ prefix: 'fab', iconName: 'youtube' });
        const yootoobIcon = icon(yootoob);
        Array.from(yootoobIcon.node).map(n => document.getElementsByClassName('logo-icon2')[0].appendChild(n))
        const sidenav = document.getElementsByClassName('sidenav')[0];
        const sidenav2 = document.getElementsByClassName('sidenav2')[0];
        const sidenav3 = document.getElementsByClassName('sidenav3')[0];
        if (window.location.hash === 'login' || window.location.hash === 'signup' || window.location.hash.split('/')[1] === 'watch' ) {
            sidenav.classList.add('hidden')
            sidenav2.classList.add('hidden')
        } else {
            if (sidenav.classList.contains('hidden')) {
                sidenav.classList.remove('hidden')
                sidenav2.classList.add('hidden')
            }
        }
        if (this.props.modal && this.props.modal.modal === 'sidenav') {
            sidenav3.classList.remove('hidden')
        }
    }

    render(){
        return(
            <div>
                <div className='sidenav'>
                    <Link to='/' className='home-icon-text-container'>
                        <div className='home-icon'></div>
                        <span className='home-text'>Home</span>
                    </Link>
                    <a className='github-icon-text-container' href="https://github.com/hxie3" target='_blank'>
                        <div className='github-icon'></div>
                        <span className='github-text'>Github</span>
                    </a>
                    <a className='github-icon-text-container' href="https://www.linkedin.com/in/herman-xie-178571164/" target='_blank'>
                        <div className='linkedin-icon'></div>
                        <span className='github-text'>LinkedIn</span>
                    </a>
                    <a className='github-icon-text-container' href="https://angel.co/herman-xie" target='_blank'>
                        <div className='angellist-icon'></div>
                        <span className='github-text'>AngelList</span>
                    </a>
                </div>
                <div className='sidenav2 hidden'>
                    <Link to='/' className='home-icon-text-container2'>
                        <div className='home-icon2'></div>
                        <span className='home-text2'>Home</span>
                    </Link>
                    <a target='_blank' className='github-icon-text-container2' href="https://github.com/hxie3">
                        <div className='github-icon2'></div>
                        <span className='github-text2'>Github</span>
                    </a>
                    <a target='_blank' className='github-icon-text-container2' href="https://www.linkedin.com/in/herman-xie-178571164/">
                        <div className='linkedin-icon2'></div>
                        <span className='github-text2'>LinkedIn</span>
                    </a>
                    <a target='_blank' className='github-icon-text-container2' href="https://angel.co/herman-xie">
                        <div className='angellist-icon2'></div>
                        <span className='github-text2'>AngelList</span>
                    </a>
                </div>
                <div className='sidenav3 hidden'>
                    <div className="hamburger-icon-text-container">
                        <div className='hamburger2' onClick={this.props.closeModal}></div>
                        <Link onClick={this.props.closeModal} to='/' className='logo'><div className='logo-icon2'></div>YooToob</Link>
                    </div>
                    <Link onClick={this.props.closeModal} to='/' className='home-icon-text-container2'>
                        <div className='home-icon3'></div>
                        <span className='home-text2'>Home</span>
                    </Link>
                    <a target='_blank' className='github-icon-text-container2' href="https://github.com/hxie3">
                        <div className='github-icon3'></div>
                        <span className='github-text2'>Github</span>
                    </a>
                    <a target='_blank' className='github-icon-text-container2' href="https://www.linkedin.com/in/herman-xie-178571164/">
                        <div className='linkedin-icon3'></div>
                        <span className='github-text2'>LinkedIn</span>
                    </a>
                    <a target='_blank' className='github-icon-text-container2' href="https://angel.co/herman-xie">
                        <div className='angellist-icon3'></div>
                        <span className='github-text2'>AngelList</span>
                    </a>
                </div>
            </div>
        )
    }
}

export default SideNav