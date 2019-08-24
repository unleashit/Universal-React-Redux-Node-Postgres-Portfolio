import React, { Component } from 'react';
import Helmet from 'react-helmet';
import Footer from '../footer/footer';
import LiveChatContainer from '../ReactHelpDesk/client/liveChatContainer';
import LiveChatLauncher from '../ReactHelpDesk/client/chatLauncher';
import { toggleChat } from '../ReactHelpDesk/client/actions/liveChat';
import { connect } from 'react-redux';
import "regenerator-runtime/runtime";

if (typeof document !== 'undefined') require('../../../scss/global.scss');

export class App extends Component {
    constructor(props) {
        super(props);

        this.toggleChatHandler = this.toggleChatHandler.bind(this);
    }

    toggleChatHandler() {
        if (this.props.liveChat.chatOpen) {
            this.props.toggleChat(false);
        }
    }

    render() {
        let stylesheets = [
            {
                rel: 'stylesheet',
                href: 'https://fonts.googleapis.com/css?family=Oswald|Sanchez&display=block',
                async: true
            }
        ];

        if (process.env.NODE_ENV === 'production')
            stylesheets.unshift({
                rel: 'stylesheet',
                href: '/css/global.min.css'
            });

        // Don't display the footer on 404 pages
        // TODO: better solution
        const { children } = this.props;
        const footer =
            this.props.children &&
            children.props &&
            children.props.route &&
            children.props.route.path ? (
                children.props.route.path === '*' ? null : (
                    <Footer slug={children.props.route.path.slice(1)} />
                )
            ) : null;

        return (
            <div className="page-wrapper">
                <div
                    className={
                        this.props.liveChat.chatOpen
                            ? 'content-wrapper live-chat-open'
                            : 'content-wrapper'
                    }
                    onClick={this.toggleChatHandler}
                >
                    <Helmet
                        title="Front End / Full Stack Engineer in Portland, OR specializing in React, Javascript, Node.Js, Devops and more."
                        titleTemplate="Jason Gallagher - %s"
                        meta={[
                            { 'char-set': 'utf-8' },
                            {
                                name: 'description',
                                content:
                                    'Full Stack Engineer in Portland. Focused on React, Node.Js, Typescript, Frontend/Backend, Devops, AWS, Serverless.'
                            },
                            {
                                name: 'viewport',
                                content: 'width=device-width, initial-scale=1'
                            }
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

/* istanbul ignore next */
function mapStateToProps(state) {
    return {
        liveChat: state.liveChat
    };
}

export default connect(
    mapStateToProps,
    { toggleChat }
)(App);
