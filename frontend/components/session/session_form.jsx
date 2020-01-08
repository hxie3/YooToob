import React from "react";

class SessionForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: ''
        };
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.processForm(user);
    }

    handleUsernameChange(e) {
        this.setState({
            username: e.target.value
        })
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value
        })
    }

    handlePasswordChange(e){
        this.setState({
            password: e.target.value
        })
    }

    render(){
       
        return (
            <div className='session-form'>
                <div>{this.props.formType} or {this.props.navLink}</div>
                <br/>
                <form className='session-form-inputs' onSubmit={this.handleSubmit}>
                    <label> <div>Username:</div>
                        <input type="text" value={this.state.username} onChange={this.handleUsernameChange}/>
                    </label>
                    <br/>
                    {this.props.formType === "signup" ? (<label><div>Email:</div>
                        <input type="text" value={this.state.email} onChange={this.handleEmailChange} />
                    </label>) : '' }
                    <br/>
                    <label><div>Password:</div>
                        <input type="password" value={this.state.password} onChange={this.handlePasswordChange} />
                    </label>
                    <br/>
                    <input type="submit" value={this.props.formType}/>
                </form>
            </div>
        );
    }
}

export default SessionForm;