import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom"

class SideNav extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        library.add(fas, fab)
        const home = findIconDefinition({ prefix: 'fas', iconName: 'home' });
        const homeIcon = icon(home);
        Array.from(homeIcon.node).map(n => document.getElementsByClassName('home-icon')[0].appendChild(n))
        Array.from(homeIcon.node).map(n => document.getElementsByClassName('home-icon2')[0].appendChild(n))
        const github = findIconDefinition({ prefix: 'fab', iconName: 'github' });
        const githubIcon = icon(github);
        Array.from(githubIcon.node).map(n => document.getElementsByClassName('github-icon')[0].appendChild(n))
        Array.from(githubIcon.node).map(n => document.getElementsByClassName('github-icon2')[0].appendChild(n))
        const sidenav = document.getElementsByClassName('sidenav')[0];
        const sidenav2 = document.getElementsByClassName('sidenav2')[0];
        if (window.location.hash !== '#/') {
            sidenav.classList.add('hidden')
            sidenav2.classList.add('hidden')
        } else {
            if (sidenav.classList.contains('hidden')) {
                sidenav.classList.remove('hidden')
                sidenav2.classList.add('hidden')
            }
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
                </div>
            </div>
        )
    }
}

export default SideNav