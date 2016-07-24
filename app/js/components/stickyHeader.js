import React from 'react';
import Navigation from './navigation';

export default class StickyHeader extends React.Component {
    render() {

        let classes = 'sticky-header hidden-xs-down';
        classes += this.props.visible ? ' on' : ' off';

        return (
            <div className={classes}>
                <div className="container-fluid">
                    <Navigation ulClass="sticky-nav" home={true} logo="1" />
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