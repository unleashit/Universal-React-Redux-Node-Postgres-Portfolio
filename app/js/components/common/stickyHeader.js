import React from 'react';
import Navigation from './navigation';
import ReactGA from'react-ga';
import Hamburger from './hamburger';

export default class StickyHeader extends React.Component {
    render() {

        let classes = 'sticky-header hidden-xs-down';
        classes += this.props.visible ? ' on' : ' off';

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
                            <span className="phone" onClick={analytics.bind(this, 'phone number in header')}><i className="fa fa-phone"></i> (415) 287.3221</span>
                            <span className="skype" onClick={analytics.bind(this, 'skype in header')}><a href="skype:jason-gallagher?chat"><i className="fa fa-skype"></i> skype</a></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}