import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import CreateVideoFormContainer from '../video/create_video_form_container';
import UpdateVideoFormContainer from '../video/update_video_form_container';
import SideNavContainer from '../sidenav/sidenav_container';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }
    let component;
    switch (modal) {
        case 'create-video':
            component = <CreateVideoFormContainer />;
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