import React, {Component} from 'react';
import Helmet from 'react-helmet';
import Footer from '../components/common/footer';
import LiveChatContainer from './liveChat';
import LiveChatLauncher from '../components/live-chat/chatLauncher';
import {toggleChat} from '../actions/liveChat';
import { connect } from 'react-redux';

if (typeof document !== 'undefined') require('../../scss/global.scss');

export class App extends Component {

    closeChat() {
        if (this.props.liveChat.chatOpen) {
            this.props.dispatch(toggleChat(false));
        }
    }

    render() {
        
        let stylesheets = [
            {'rel': 'stylesheet', 'href': 'https://fonts.googleapis.com/css?family=Oswald|Sanchez', 'async': true}
        ];

        if (process.env.NODE_ENV === 'production') stylesheets.unshift({
            'rel': 'stylesheet',
            'href': '/css/global.min.css'
        });

        // footer needs a different background color on homepage vs. the rest of site
        // There must be a better way...
        let footer = null;
        if (
            typeof this.props.children !== 'undefined' &&
            typeof this.props.children.props !== 'undefined' &&
            typeof this.props.children.props.route !== 'undefined' &&
            typeof this.props.children.props.route.path !== 'undefined'
        ) {
            footer = this.props.children.props.route.path === '*' 
                ? null
                : <Footer slug={this.props.children.props.route.path.slice(1)}/>;
        }

        return (
            <div className="page-wrapper">
                <div className={this.props.liveChat.chatOpen ? 'content-wrapper live-chat-open' : 'content-wrapper'}
                     onClick={this.closeChat.bind(this)}>
                    <Helmet
                        title='Front End Engineer in Berkeley, CA specializing in React, Javascript, Node.Js, Angular and Drupal'
                        titleTemplate='Jason Gallagher - %s'
                        meta={[
                            {'char-set': 'utf-8'},
                            {
                                'name': 'description',
                                'content': 'Full Stack Engineer in Berkeley. Focused on React, Angular, Node.Js, Drupal, UI/UX. San Francisco Bay Area, East Bay, San Francisco and Oakland.'
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
