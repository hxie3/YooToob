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
        return(
            <div>
                <Link className='signup' to='/signup'>Sign Up</Link>
                <Link className='login' to='/login'>Log In</Link>
            </div>
        )
    }
}

export default Greeting;