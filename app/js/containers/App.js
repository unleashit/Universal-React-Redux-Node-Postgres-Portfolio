import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/common/footer';
import LiveChatContainer from './liveChat';
import LiveChatLauncher from '../components/live-chat/chatLauncher';
import {toggleChat} from '../actions/liveChat';
import { connect } from 'react-redux';

if (typeof document !== 'undefined') require('../../scss/global.scss');

class App extends Component {

    closeChat() {
        if (this.props.liveChat.chatOpen) {
            this.props.dispatch(toggleChat(false));
        }
    }

    render() {

        let stylesheets = [
            {'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Oswald|Sanchez'}
        ];

        if (process.env.NODE_ENV === 'production') stylesheets.unshift({
            'rel': 'stylesheet',
            'href': '/css/global.min.css'
        });

        // There must be a better way...
        const footer = this.props.children.props.route.path === '*' ? '' : <Footer slug={this.props.params.slug}/>;

        return (
            <div className="page-wrapper">
                <div className={this.props.liveChat.chatOpen ? 'content-wrapper live-chat-open' : 'content-wrapper'}
                     onClick={this.closeChat.bind(this)}>
                    <Helmet
                        title='Front End Engineer in Berkeley, CA specializing in React, Angular, Drupal, Javascript and NodeJs'
                        titleTemplate='Jason Gallagher - %s'
                        meta={[
                            {'char-set': 'utf-8'},
                            {
                                'name': 'description',
                                'content': 'Full Stack Developer specializing on the Front End. Located in the San Francisco Bay Area and focused on React, Angular, NodeJs, Drupal, UI/UX. In the East Bay near San Francisco and Oakland.'
                            },
                            {'name': 'viewport', 'content': 'width=device-width, initial-scale=1'}
                        ]}
                        link={stylesheets}
                    />
                    {this.props.children}
                    {footer}
                </div>
                <LiveChatLauncher />
                <LiveChatContainer />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        liveChat: state.liveChat
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch: dispatch
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
