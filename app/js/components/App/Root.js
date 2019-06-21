import React, { Component } from 'react';

class Root extends Component {
    renderInitialState() {
        if (this.props.initialState) {
            const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(
                this.props.initialState
            )}`;
            return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />;
        }
    }

    renderEnvironment() {
        const innerHtml = `window.__ENVIRONMENT__ = '${__ENVIRONMENT__};'
            window.__GOOGLE_ANALYTICS__ = '${__GOOGLE_ANALYTICS__}';
            window.__LIVE_CHAT_ADMIN_NAME__ = '${__LIVE_CHAT_ADMIN_NAME__}';`;
        return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />;
    }

    lazyLoadScripts() {
        const innerHtml = `
                function lazyLoadScript(scrpt) {
                    var element = document.createElement("script");
                    element.src = scrpt;
                    element.async = true;
                    document.body.appendChild(element);
                }`;
        return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />;
    }

    lazyLoadScript(scrpt) {
        if (process.env.NODE_ENV !== 'production' && scrpt.global) {
            return <script src={scrpt.devSrc} />;
        } else {
            const innerHtml = `
                window.addEventListener('load', lazyLoadScript.bind(null, '${
                    scrpt.src
                }'), false);`;
            return <script dangerouslySetInnerHTML={{ __html: innerHtml }} />;
        }
    }

    render() {
        const head = this.props.head;
        const attrs = head.htmlAttributes.toComponent();

        return (
            <html {...attrs}>
                <head>
                    {head.title.toComponent()}
                    {head.meta.toComponent()}
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/images/favicons/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        href="/images/favicons/favicon-32x32.png"
                        sizes="32x32"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        href="/images/favicons/android-chrome-192x192.png"
                        sizes="192x192"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        href="/images/favicons/favicon-16x16.png"
                        sizes="16x16"
                    />
                    <link
                        rel="manifest"
                        href="/images/favicons/manifest.json"
                    />
                    <link
                        rel="mask-icon"
                        href="/images/favicons/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <link
                        rel="shortcut icon"
                        href="/images/favicons/favicon.ico"
                    />
                    <meta
                        name="google-site-verification"
                        content="PcZbHamu8N77ConcEm3oykmUEroNsJhpM6ZTrnvEO40"
                    />
                    <meta name="format-detection" content="telephone=no" />
                    <meta
                        name="msapplication-config"
                        content="/images/favicons/browserconfig.xml"
                    />
                    <meta name="theme-color" content="#ffffff" />
                    <meta name="referrer" content="origin" />
                    {head.link.toComponent()}
                    {this.renderEnvironment()}
                    {this.lazyLoadScripts()}
                </head>
                <body>
                    <div
                        id="root"
                        dangerouslySetInnerHTML={{ __html: this.props.content }}
                    />
                    {this.renderInitialState()}
                    {head.script.toComponent()}
                    {this.lazyLoadScript({
                        src: '/js/global.min.js',
                        devSrc: '/js/global.js',
                        global: true
                    })}
                    {this.lazyLoadScript({
                        src:
                            'https://cdnjs.cloudflare.com/ajax/libs/smooth-scroll/11.0.2/js/smooth-scroll.min.js'
                    })}
                </body>
            </html>
        );
    }
}

export default Root;
