import React, {Component} from 'react';

class Root extends Component {

    renderInitialState() {
        if (this.props.initialState) {
            const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
            return <script dangerouslySetInnerHTML={{__html: innerHtml}}/>;
        }
    }

    renderEnvironment() {
        const innerHtml = `window.__ENVIRONMENT__ = '${__ENVIRONMENT__}'`;
        return <script dangerouslySetInnerHTML={{__html: innerHtml}}/>
    }

    render() {
        const head = this.props.head;
        const attrs = head.htmlAttributes.toComponent();

        return (
            <html {...attrs}>
            <head>
                {head.title.toComponent()}
                {head.meta.toComponent()}
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" href="/images/favicons/favicon-32x32.png" sizes="32x32"/>
                <link rel="icon" type="image/png" href="/images/favicons/android-chrome-192x192.png" sizes="192x192"/>
                <link rel="icon" type="image/png" href="/images/favicons/favicon-16x16.png" sizes="16x16"/>
                <link rel="manifest" href="/images/favicons/manifest.json"/>
                <link rel="mask-icon" href="/images/favicons/safari-pinned-tab.svg" color="#5bbad5"/>
                <link rel="shortcut icon" href="/images/favicons/favicon.ico"/>
                <meta name="msapplication-config" content="/images/favicons/browserconfig.xml"/>
                <meta name="theme-color" content="#ffffff"/>
                {head.link.toComponent()}
            </head>
            <body>
            <div id='root' dangerouslySetInnerHTML={{__html: this.props.content}}/>
            {this.renderEnvironment()}
            {this.renderInitialState()}
            {head.script.toComponent()}
            <script src={!process.env.NODE_ENV ? 'js/global.js' : '/js/global.min.js'}></script>
            </body>
            </html>
    );
    }
    }

    export default Root;
