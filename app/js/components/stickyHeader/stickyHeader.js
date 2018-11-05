import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Navigation from '../navigation/navigation';
import OpenChat from '../ReactHelpDesk/client/openChat';
import LiveChatStatus from '../ReactHelpDesk/client/liveChatStatus';
import { ReactGA } from '../../libs/utils';
import * as globalActions from '../../actions/global';
import throttle from 'lodash/throttle';

export class StickyHeader extends React.Component {
    constructor(props) {
        super(props);
        this.boundHandleScroll = throttle(
            this.handleScroll.bind(this, props.dispatch),
            150
        );
    }

    componentDidMount() {
        window.addEventListener('scroll', this.boundHandleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.boundHandleScroll);
        document.documentElement.className = '';
        const { dispatch, global } = this.props;
        if (global.headerState) dispatch(globalActions.setHeader(false));
    }

    analytics(type) {
        ReactGA.event({
            category: 'button click',
            action: type
        });
    }

    handleScroll() {
        const { dispatch } = this.props;
        const scrl = window.pageYOffset;

        // handle sticky header
        if (scrl >= 250 && this.props.global.headerState === false) {
            document.documentElement.className = 'sticky-menu-open';
            dispatch(globalActions.setHeader(true));
        } else if (scrl < 250 && this.props.global.headerState === true) {
            document.documentElement.className = '';
            dispatch(globalActions.setHeader(false));
        }
    }

    render() {
        const {
            visible,
            global: { headerState }
        } = this.props;

        const classes = `sticky-header hidden-xs-down${
            visible || headerState ? ' on' : ' off'
        }`;

        return (
            <div className={classes}>
                <div className="container-fluid">
                    <Navigation ulClass="sticky-nav" home={true} logo="1" />
                    <div
                        className="hamburger-alt hidden-md-up pull-right"
                        onClick={this.props.openBurger}
                    >
                        <i className="fa fa-bars" /> &nbsp;MENU
                    </div>
                    <div className="contact-info pull-right hidden-xs-down">
                        <div>
                            <span
                                className="chat-status"
                                onClick={() => this.analytics('chat in header')}
                            >
                                <OpenChat>
                                    <LiveChatStatus
                                        remoteId={this.props.remoteId}
                                    />
                                </OpenChat>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

StickyHeader.propTypes = {
    visible: PropTypes.bool,
    openBurger: PropTypes.func.isRequired,
    remoteId: PropTypes.string.isRequired
};

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        global: state.global
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
)(StickyHeader);
