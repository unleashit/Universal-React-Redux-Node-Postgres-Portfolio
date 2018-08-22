import React from 'react';
import PropTypes from 'prop-types';
import Navigation from '../navigation/navigation';
import OpenChat from '../live-chat/openChat';
import LiveChatStatus from '../live-chat/liveChatStatus';
import { ReactGA } from '../../libs/utils';

export default class StickyHeader extends React.Component {
    analytics(type) {
        ReactGA.event({
            category: 'button click',
            action: type
        });
    };

    render() {
        let classes = `sticky-header hidden-xs-down${this.props.visible ? ' on' : ' off'}`;

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
                                className="phone"
                                onClick={() => this.analytics(
                                    'phone number in header'
                                )}
                            >
                                <i className="fa fa-phone" /> (707) 280-3629
                            </span>
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
    visible: PropTypes.bool.isRequired,
    openBurger: PropTypes.func.isRequired,
    remoteId: PropTypes.string.isRequired
};