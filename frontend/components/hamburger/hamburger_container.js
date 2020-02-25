import { connect } from 'react-redux';
import { openModal } from '../../actions/modal_actions'
import Hamburger from './hamburger';

const mapStateToProps = state => {
    return {
        user: state.entities.users[state.session.id],
    };
};

const mapDispatchToProps = dispatch => ({
    openModal: (modal) => dispatch(openModal(modal)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Hamburger);