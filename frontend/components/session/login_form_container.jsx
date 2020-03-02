import { connect } from 'react-redux';
import React from 'react';
import { Link } from 'react-router-dom';
import { login, newlogin, clearErrors } from '../../actions/session_actions';
import SessionForm from './session_form';
import { openModal, closeModal } from '../../actions/modal_actions';

const mapStateToProps = (state) => {
    return {
        errors: state.errors.session,
        formType: 'login',
        navLink: <a className='create-account' onClick={() => openModal('signup')}>Create Account</a>,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processForm: (user) => dispatch(login(user)),
        newProcessForm: (user) => dispatch(newlogin(user)),
        clearErrors: () => dispatch(clearErrors()),
        closeModal: () => dispatch(closeModal()),
        openModal: (str) => dispatch(openModal(str)),
    };
};

export default (connect(mapStateToProps, mapDispatchToProps)(SessionForm));
