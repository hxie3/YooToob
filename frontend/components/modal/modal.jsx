import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import LoginFormContainer from '../session/login_form_container';
import SignupFormContainer from '../session/signup_form_container';
import CreateVideoFormContainer from '../video/create_video_form_container';
import ProfilePictureContainer from '../profile/profile_picture_container';
import UpdateVideoFormContainer from '../video/update_video_form_container';
import SideNavContainer from '../sidenav/sidenav_container';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'signup':
            component = <SignupFormContainer />;
            break;
        case 'login':
            component = <LoginFormContainer />;
            break;
        case 'create-video':
            component = <CreateVideoFormContainer />;
            return (
                <div className="modal-background">
                    <div className="modal-child" onClick={e => e.stopPropagation()}>
                        {component}
                    </div>
                </div>
            )
        case 'profile-picture':
            component = <ProfilePictureContainer />;
            return (
                <div className="modal-background">
                    <div className="modal-child" onClick={e => e.stopPropagation()}>
                        {component}
                    </div>
                </div>
            )
        case 'update-video':
            component = <UpdateVideoFormContainer />;
            break;
        case 'sidenav':
            component = <SideNavContainer/>;
            return (
                <div className="modal-background" onClick={closeModal}>
                    <div className="sidenav-modal-child" onClick={e => e.stopPropagation()}>
                        {component}
                    </div>
                </div>
            )
        default:
            return null;
    }
    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);