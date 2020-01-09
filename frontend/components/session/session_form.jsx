import React from "react";
import {Link} from "react-router-dom"

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { 
                username: '',
                password: ''
            },
            formType: this.props.formType
        };
        this.handleNewSubmit = this.handleNewSubmit.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleShake = this.handleShake.bind(this);
    }

    handleNewSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state.user);
        this.props.processForm(user);
        this.handleShake(e)
    }

    handleShake(e) {
        e.persist();
        if (this.props.errors.length !== 0) {
            $('form').addClass('ahashakeheartache');
        }
        $('form').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', e => {
            $('form').delay(200).removeClass('ahashakeheartache');
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (e.target.innerHTML === 'Next') {
            const user = Object.assign({}, this.state.user);
            this.props.newProcessForm(user);
            setTimeout(() => {
                if(this.props.errors.length === 0) {
                    this.setState( { formType: "password" })
                } else {
                    this.handleShake(e);
                }
            }, 250)
        } else {
            // Auto Type for later
            // this.props.newProcessForm({ username: 'DemoUser123' });
            // setTimeout(() => {
            //     this.setState({ formType: "password" })
            //     setTimeout(() => {
            //         this.props.processForm({username: 'DemoUser123', password: 'DemoUser123'})
            //     }, 50)
            // }, 50)
            this.props.processForm({ username: 'DemoUser123', password: 'DemoUser123' })
        }
    }

    handleUsernameChange(e) {
        let user = {...this.state.user};
        user.username = e.target.value;
        this.setState({user});
    }

    handlePasswordChange(e){
        let user = { ...this.state.user };
        user.password = e.target.value;
        this.setState({ user });
    }

    handleBack(e){
        e.preventDefault();
        history.back();
    }

    componentDidMount(){
        document.getElementsByClassName("header")[0].classList.add("hidden")
    }

    componentWillUnmount(){
        document.getElementsByClassName("header")[0].classList.remove("hidden")
        this.props.clearErrors()
    }

    render(){
        let form;
        if (this.state.formType === 'password') {
            form = 
            <div className='session-form'>
                <div className='inner-session-form-two'>
                    <span className='signup-or-signin'>Welcome</span>
                    <br/>
                    <span className='signup-or-signin-followup'>{this.state.user.username}</span>
                    <br/>
                    <form className='session-form-form' onSubmit={this.handleNewSubmit}>
                        <span className='input-errors'>{this.props.errors}</span>
                        <input className='username' placeholder='Password' type="password" value={this.state.user.password} onChange={this.handlePasswordChange}/>
                        <br/>  
                        <div className='back-or-signup'>
                            <button className="next" onClick={this.handleNewSubmit}>{this.props.formType === 'signup' ? 'Sign up' : 'Sign in'}</button>
                            <button className='back' onClick={this.handleBack}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        } else {
            form = 
            <div className='session-form'>
                <div className='inner-session-form'>
                    <span className='signup-or-signin'>{this.props.formType === 'signup' ? 'Sign up' : 'Sign in'}</span>
                    <br/>
                    <span className='signup-or-signin-followup'> to continue to YooToob</span>
                    <br/>
                    <form className='session-form-form'>
                        <span className='input-errors'>{this.props.errors}</span>
                        <input className='username' type="text" value={this.state.user.username} onChange={this.handleUsernameChange} placeholder="Username"/>
                        <br/>
                        <br/>
                        {
                            this.props.formType === 'signup' ? '' : (
                                <div>
                                    <span className = 'demo-login-desc'>No time? Use Demo Login to check the site out.</span>
                                    <br />
                                    <Link className='link-demo-login' to='/' onClick={this.handleSubmit}>Demo Login</Link>
                                </div>
                            ) 
                        }
                        <br/>
                        <div className='create-account-or-next'>
                            {this.props.navLink}
                            <button className='next' onClick={this.handleSubmit}>Next</button>
                        </div>
                    </form>
                </div>
            </div>
        }
        return (
            form
        );
    }
}

export default SessionForm;