import React from "react";

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { 
                username: '',
                password: ''
            },
            errors: this.props.errors,
            formType: this.props.formType
        };
        this.handleNewSubmit = this.handleNewSubmit.bind(this)
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleNewSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state.user);
        this.props.processForm(user);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state.user);
        this.props.newProcessForm(user);
        setTimeout(() => {
            if(this.props.errors.length === 0) {
                this.setState( { formType: "password" })
            }
        }, 50)
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

    componentDidMount(){
        document.getElementsByClassName("header")[0].classList.add("hidden")
    }

    componentWillUnmount(){
        document.getElementsByClassName("header")[0].classList.remove("hidden")
    }

    render(){
        let form;
        if (this.state.formType === 'password') {
            form = <div>
                <span>Hi {this.state.user.username}</span>
                <form onSubmit={this.handleNewSubmit}>
                    <label>Password:
                        <input type="password" value={this.state.user.password} onChange={this.handlePasswordChange}/>  
                        <span>{this.props.errors}</span>
                    </label>
                    <input type="submit" value={this.props.formType}/>
                </form>
            </div>
        } else {
            form = <div className='session-form'>
                <span>{this.props.formType === 'signup' ? 'Sign Up' : 'Log In'}</span>
                <span>to continue to YooToob</span>
                <br/>
                <form className='session-form-inputs' onSubmit={this.handleSubmit}>
                    <label> <div>Username:</div>
                        <input type="text" value={this.state.user.username} onChange={this.handleUsernameChange}/>
                        <span>{this.props.errors}</span>
                    </label>
                    <br/>
                    <div>
                        {this.props.navLink}
                        <input type="submit" value='Next'/>
                    </div>
                </form>
            </div>
        }
        return (
            form
        );
    }
}

export default SessionForm;