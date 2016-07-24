import React from 'react';

export default class StickyHeader extends React.Component {
    render() {

        const classes = this.props.visible ? 'sticky-header on' : 'sticky-header off';

        return (
            <div className={classes}>
                <h3>DINOSAUR</h3>
            </div>
        );
    }
}