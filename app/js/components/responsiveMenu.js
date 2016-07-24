import React from 'react';
import Navigation from './navigation';

export default class ResponsiveMenu extends React.Component {
    render() {

        let classes = 'responsive-menu hidden-md-up';
        classes += this.props.menuVisible ? ' on' : ' off';

        return (
            <div className={classes}>
                <h1>Responsive menu</h1>
            </div>
        );
    }
}