import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import * as DinoActions from '../actions/dino';

// @connect(state => { users: state.users })
class Dino extends Component {

    static readyOnActions(dispatch) {
        return dispatch(DinoActions.dinoInit(6));
    }
    
    componentDidMount() {
       Dino.readyOnActions(this.props.dispatch);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.dispatch(DinoActions.dinoGrowled(1));
    }

    render() {

        const {growls} = this.props.dino;

        return (
            <div>
                <Helmet title='Dino' />
                <h5>Dinosaur Page</h5>
                <p>Hello dino. You have growled {growls} times!</p>
                <div><button onClick={this.handleClick.bind(this)}>Growl Again!</button></div>
                <p>Now you can go <Link to="/">home!</Link></p>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        dino: state.dino
    };
}

export default connect(mapStateToProps)(Dino);
