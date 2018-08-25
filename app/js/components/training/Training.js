import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import StickyHeader from '../stickyHeader/stickyHeader';
import ResponsiveMenu from '../navigation/responsiveMenu';
import TrainingMain from './trainingMain';
import * as globalActions from '../../actions/global';

if (typeof document !== 'undefined')
    require('../../../scss/training/training.scss');

export class Training extends Component {
    static readyOnActions(dispatch, params, bypassCheck = false) {
        return Promise.all([dispatch(globalActions.animateOff())]);
    }

    componentDidMount() {
        const { dispatch, params } = this.props;
        Training.readyOnActions(dispatch, params);
        window.scrollTo(0, 0);
    }

    openBurger() {
        this.props.dispatch(globalActions.openHamburger());
    }

    closeBurger() {
        this.props.dispatch(globalActions.closeHamburger());
    }

    // hide header on small devices when chat is open
    headerVisible() {
        if (typeof window !== 'undefined') {
            return window.innerWidth <= 768
                ? !this.props.liveChat.chatOpen
                : true;
        } else return true;
    };

    render() {
        const { hamburgerState, htmlClass } = this.props.global;
        const htmlClassCheck = htmlClass ? { class: htmlClass } : {};

        const title = 'Front End Development Bootcamp';
        const metadesc =
            'Full Stack Training in Javascript, Html, CSS, React, Node.js, Mysql, Linux and more';

        return (
            <div id="interior-page">
                <Helmet
                    title={title}
                    htmlAttributes={htmlClassCheck}
                    meta={[{ name: 'description', content: metadesc }]}
                    link={[
                        {
                            rel: 'canonical',
                            href: 'https://jasongallagher.org/training'
                        }
                    ]}
                />
                <StickyHeader
                    visible={this.headerVisible()}
                    openBurger={this.openBurger.bind(this)}
                    remoteId={this.props.liveChat.remoteId}
                    dispatch={this.props.dispatch}
                />
                <ResponsiveMenu
                    closeBurger={this.closeBurger.bind(this)}
                    menuVisible={hamburgerState}
                />

                <TrainingMain />
            </div>
        );
    }
}

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        global: state.global,
        contactForm: state.contactForm,
        liveChat: state.liveChat
    };
}
/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Training);

Training.propTypes = {
    global: PropTypes.shape({
        hamburgerState: PropTypes.bool.isRequired,
        htmlClass: PropTypes.string
    }),
    liveChat: PropTypes.shape({
        remoteId: PropTypes.string,
        chatOpen: PropTypes.bool
    }),
    dispatch: PropTypes.func
};
