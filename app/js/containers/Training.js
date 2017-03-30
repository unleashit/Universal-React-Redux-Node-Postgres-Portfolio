import React, {Component} from 'react';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import StickyHeader from '../components/common/stickyHeader';
import ResponsiveMenu from '../components/common/responsiveMenu';
import TrainingMain from '../components/training/trainingMain';
import * as globalActions  from '../actions/global';

if (typeof document !== 'undefined') require('../../scss/training/training.scss');

class Training extends Component {

    static readyOnActions(dispatch, params, bypassCheck = false) {
        return Promise.all([dispatch(globalActions.animateOff())]);
    }

    componentDidMount() {
        const {dispatch, params} = this.props;
        Training.readyOnActions(dispatch, params);
        window.scrollTo(0, 0);
    }

    openBurger() {
        this.props.dispatch(globalActions.openHamburger());
    }
    
    closeBurger() {
        this.props.dispatch(globalActions.closeHamburger());
    }

    render() {

        const { hamburgerState, htmlClass } = this.props.global;
        const htmlClassCheck = htmlClass ? {"class": htmlClass} : {};

        const title = 'Jason Gallagher - Front End Development Bootcamp';
        const metadesc = 'Full Stack Training in Javascript, Html, CSS, React, Node.js, Mysql, Linux and more';

        // hide header on small devices when chat is open
        const headerVisible = () => {
            if (typeof window !== 'undefined') {
                return window.innerWidth <= 768 ? !this.props.liveChat.chatOpen : true;
            } else return true;
        };

        return (
            <div id="interior-page">
                <Helmet
                    title={title}
                    htmlAttributes={htmlClassCheck}
                    meta={[
                        {'name': 'description', 'content': metadesc}
                    ]}
                    link = {[
                        {"rel": "canonical", "href": "https://jasongallagher.org/training"}
                    ]}
                />
                <StickyHeader visible={headerVisible()}
                              displayHamburger={true}
                              openBurger={this.openBurger.bind(this)}
                              remoteId={this.props.liveChat.remoteId}
                              dispatch={this.props.dispatch}
                />
                <ResponsiveMenu
                    closeBurger={this.closeBurger.bind(this)}
                    menuVisible={hamburgerState}
                />

                <TrainingMain />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        global: state.global,
        contactForm: state.contactForm,
        liveChat: state.liveChat
    };
}
function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Training);