import React from 'react';
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom"

class SideNav extends React.Component {
    componentDidMount() {
        library.add(fas, fab)
        const home = findIconDefinition({ prefix: 'fas', iconName: 'home' });
        const homeIcon = icon(home);
        Array.from(homeIcon.node).map(n => document.getElementsByClassName('home-icon')[0].appendChild(n))
        const github = findIconDefinition({ prefix: 'fab', iconName: 'github' });
        const githubIcon = icon(github);
        Array.from(githubIcon.node).map(n => document.getElementsByClassName('github-icon')[0].appendChild(n))
    }

    render(){
        return(
            <div className='sidenav'>
                <Link to="/" className='home-icon'></Link>
                <a target='_blank' className='github-icon' href="https://github.com/hxie3"></a>
            </div>
        )
    }
}

export default SideNav