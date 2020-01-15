import React from "react";
import { library, icon, findIconDefinition } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { Link } from "react-router-dom"

class Greeting extends React.Component {
    constructor(props){
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
        this.handleDropdown = this.handleDropdown.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
    }

    handleLogout(e){
        e.preventDefault();
        this.props.logout();
    }

    handleDropdown(e){
        e.preventDefault();
        document.getElementsByClassName('dropdown')[0].classList.toggle('is-active');
    }

    componentDidMount(){
        library.add(fas, fab)
        const videoIcon = findIconDefinition({ prefix: 'fas', iconName: 'video' });
        const videoIconIcon = icon(videoIcon);
        Array.from(videoIconIcon.node).map(n => document.getElementsByClassName('upload')[0].appendChild(n))
        if (document.getElementsByClassName('sign-out-dropdown').length === 1) {
            const exit = findIconDefinition({ prefix: 'fas', iconName: 'sign-out-alt' })
            const exitIcon = icon(exit)
            Array.from(exitIcon.node).map(n => document.getElementsByClassName('sign-out-dropdown')[0].appendChild(n))
            const $menu = $('.dropdown');
            $(document).mouseup(e => {
                if (!$menu.is(e.target)
                    && ($menu.has(e.target).length === 0))
                {
                    $menu.removeClass('is-active');
                }
            });
        }
    }

    componentDidUpdate(){
        if(document.getElementsByClassName('sign-out-dropdown').length === 1) {
            library.add(fas);
            const exit = findIconDefinition({ prefix: 'fas', iconName: 'sign-out-alt' })
            const exitIcon = icon(exit)
            Array.from(exitIcon.node).map(n => document.getElementsByClassName('sign-out-dropdown')[0].appendChild(n))
            const $menu = $('.dropdown');
            $(document).mouseup(e => {
                if (!$menu.is(e.target)
                    && ($menu.has(e.target).length === 0)) {
                    $menu.removeClass('is-active');
                }
            });
        }
    }

    handleUpload(e){
        e.preventDefault();
            if (!!this.props.user) {
            this.props.openModal('create-video')
        } else {
            window.location.hash = '#/login'
        }
    }

    render(){
        return(
            <div className='greeting-container'>
                <div className='upload' onClick={this.handleUpload}></div>
                {(!!this.props.user) ? (
                    <div className='dropdown'>
                        <img onClick={this.handleDropdown} className='profile-pic' src={this.props.user.profilePicture} alt="profile-picture"/>
                        <div className='user-dropdown'>
                            <div className='dropdown-user-info'>
                                <img className='profile-pic' src={this.props.user.profilePicture} alt="profile-picture"/>
                                <span className='dropdown-user-username'>{this.props.user.username}</span>
                            </div>
                            <div onClick={this.handleLogout} className='sign-out-dropdown-container'>
                                <div className='sign-out-dropdown'></div>
                                <span className='sign-out-dropdown-text'>Sign Out</span>
                            </div>
                        </div>
                    </div>
                ) : (
                    <Link className='login' to='/login'>
                        <img className='signin-pic' src="/rails/active_storage/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--536ca0d8d32d5254e190ef80e6c32bb3e61b6c32/default_profile_pic.jpeg" alt="default-pic"/>
                        <span className='loginsignin'>SIGN IN</span>
                    </Link> 
                )}
            </div>
        )
    }
}

export default Greeting;