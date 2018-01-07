import React from 'react';
import Navigation from './navigation';
import OpenChat from '../live-chat/openChat'
import LiveChatStatus from './liveChatStatus';
import ReactGA from'react-ga';

export default class StickyHeader extends React.Component {
    render() {

        let classes = 'sticky-header hidden-xs-down';
        classes += this.props.visible ? ' on' : ' off';

        // TODO: replace with shared component
        const hamburger = (this.props.displayHamburger) ?
            <div className="hamburger-alt hidden-sm-up pull-right"
                 onClick={this.props.openBurger.bind(this)}><i className="fa fa-bars"></i> &nbsp;MENU</div> : '';

        const analytics = (type) => {
            ReactGA.event({
                category: 'button click',
                action: type
            });
        };

        return (
            <div className={classes}>
                <div className="container-fluid">
                    <Navigation ulClass="sticky-nav" home={true} logo="1" />
                    {hamburger}
                     <div className="contact-info pull-right hidden-sm-down">
                        <div>
                            <span className="phone" onClick={analytics.bind(this, 'phone number in header')}><i className="fa fa-phone"></i> (707) 280-3629</span>
                            <span className="chat-status" onClick={analytics.bind(this, 'chat in header')}>
                                <OpenChat>
                                    <LiveChatStatus remoteId={this.props.remoteId} />
                                </OpenChat>
                            </span>
{/*
                            <span className="skype" onClick={analytics.bind(this, 'chat in header')}><a href="skype:jason-gallagher?chat"><i className="fa fa-skype"></i> skype</a></span>
*/}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}