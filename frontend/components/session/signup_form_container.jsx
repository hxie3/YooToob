import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { signup, newsignup, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType: 'signup',
        navLink: <a className='login-link' onClick={() => openModal('login')}>Sign in</a>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(signup(user)),
        newProcessForm: (user) => dispatch(newsignup(user)),
        clearErrors: () => dispatch(clearErrors()),
        closeModal: () => dispatch(closeModal()),
        openModal: (str) => dispatch(openModal(str)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
