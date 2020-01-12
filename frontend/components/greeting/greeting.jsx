import React from "react";
import { Link } from "react-router-dom"

class Greeting extends React.Component {
    constructor(props){
        super(props);

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(e){
        e.preventDefault();
        this.props.logout();
    }

    render(){
        console.log(this.props)
        return(
            <div>
                <Link className='upload' to='/upload'>Upload</Link>
                {(!!this.props.user) ? (
                    <div>
                        Welcome {this.props.user.username}
                        <img src={this.props.user.profilePicture} alt="profile-picture"/>
                        <button onClick={this.handleLogout}>Log Out</button>
                    </div>
                ) : (
                        <Link className='login' to='/login'>
                            <span className='loginsignin'>SIGN IN</span>
                        </Link> 
                )}
            </div>
        )
    }
}

export default Greeting;