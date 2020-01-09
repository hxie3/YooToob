import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, newsignup, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType: 'signup',
        navLink: <Link to="/login">Sign in</Link>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
        newProcessForm: (user) => dispatch(newsignup(user)),
        clearErrors: () => dispatch(clearErrors())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
