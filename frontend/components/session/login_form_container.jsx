import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, newlogin } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType: 'login',
        navLink: <Link to="/signup">sign up instead</Link>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(login(user)),
        newProcessForm: (user) => dispatch(newlogin(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
