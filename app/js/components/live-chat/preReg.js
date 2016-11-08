import React, { Component, PropTypes } from 'react';

class PreReg extends Component {

    render() {

        return (
            <div>
                <form onSubmit={this.props.newUser}>
                	<p>Welcome! Please enter your name to begin.</p>

                	<div className="form-group">
                		<input type="text" className="form-control" name="" id="" placeholder="Your name" />
                	</div>

                	<button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

PreReg.propTypes = {

};
PreReg.defaultProps = {};

export default PreReg;