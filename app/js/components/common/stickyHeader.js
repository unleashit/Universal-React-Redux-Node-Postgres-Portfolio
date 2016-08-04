import React from 'react';
import Navigation from './navigation';
import Hamburger from './hamburger';

export default class StickyHeader extends React.Component {
    render() {

        let classes = 'sticky-header hidden-xs-down';
        classes += this.props.visible ? ' on' : ' off';

        const hamburger = (this.props.displayHamburger) ?
            <div className="hamburger-alt hidden-sm-up pull-right"
                 onClick={this.props.openBurger.bind(this)}><i className="fa fa-bars"></i> &nbsp;MENU</div> : '';

        return (
            <div className={classes}>
                <div className="container-fluid">
                    <Navigation ulClass="sticky-nav" home={true} logo="1" />
                    {hamburger}
                     <div className="contact-info pull-right hidden-sm-down">
                        <div>
                            <span className="phone"><i className="fa fa-phone"></i> (415) 287.3221</span>
                            <span className="skype"><a href="skype:jason-gallagher?chat"><i className="fa fa-skype"></i> skype</a></span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}