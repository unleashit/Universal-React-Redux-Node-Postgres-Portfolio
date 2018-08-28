import React, { Component } from 'react';

class AccordionPane extends Component {
    constructor() {
        super();
        this.state = {
            toggleStatus: 'closed'
        };
        this.handleToggle = this.handleToggle.bind(this);
    }

    handleToggle() {
        this.setState({
            toggleStatus: this.state.toggleStatus === 'open' ? 'closed' : 'open'
        });
    }

    render() {
        return (
            <div
                onClick={this.handleToggle}
                className={'accordion ' + this.state.toggleStatus}
            >
                {this.props.children}
            </div>
        );
    }
}

export default AccordionPane;
