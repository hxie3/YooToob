import { connect } from 'react-redux';
import { closeModal } from '../../actions/modal_actions';
import SideNav from './sidenav';

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => ({
    closeModal: () => dispatch(closeModal())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SideNav);
