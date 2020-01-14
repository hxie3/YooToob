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
    }

    handleLogout(e){
        e.preventDefault();
        this.props.logout();
    }

    handleDropdown(e){
        e.preventDefault();
        document.getElementsByClassName('user-dropdown')[0].classList.toggle('hidden');
    }

    componentDidMount(){
        library.add(fas, fab)
        const videoIcon = findIconDefinition({ prefix: 'fas', iconName: 'video' });
        const videoIconIcon = icon(videoIcon);
        Array.from(videoIconIcon.node).map(n => document.getElementsByClassName('upload')[0].appendChild(n))
    }

    render(){
        return(
            <div className='greeting-container'>
                <Link className='upload' to='/upload'></Link>
                {(!!this.props.user) ? (
                    <div>
                        <img onClick={this.handleDropdown} className='profile-pic' src={this.props.user.profilePicture} alt="profile-picture"/>
                        <div className='user-dropdown hidden'>
                            <div className='dropdown-user-info'>
                                <img className='profile-pic' src={this.props.user.profilePicture} alt="profile-picture"/>
                                <span className='dropdown-user-username'>{this.props.user.username}</span>
                            </div>
                            <button onClick={this.handleLogout}>Log Out</button>
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