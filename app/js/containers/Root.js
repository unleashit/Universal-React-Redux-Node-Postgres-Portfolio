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

    renderMainScript() {
        if (!process.env.NODE_ENV) {
            return <script src={'/js/global.js'}></script>

        } else {
            const innerHtml = `
                function downloadJSAtOnload() {
                    var element = document.createElement("script");
                    element.src = "/js/global.min.js";
                    element.async = true;
                    document.body.appendChild(element);
                }
                window.addEventListener("load", downloadJSAtOnload, false);`;
            return <script dangerouslySetInnerHTML={{__html: innerHtml}}/>
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
                <link rel="apple-touch-icon" sizes="180x180" href="/images/favicons/apple-touch-icon.png"/>
                <link rel="icon" type="image/png" href="/images/favicons/favicon-32x32.png" sizes="32x32"/>
                <link rel="icon" type="image/png" href="/images/favicons/android-chrome-192x192.png" sizes="192x192"/>
                <link rel="icon" type="image/png" href="/images/favicons/favicon-16x16.png" sizes="16x16"/>
                <link rel="manifest" href="/images/favicons/manifest.json"/>
                <link rel="mask-icon" href="/images/favicons/safari-pinned-tab.svg" color="#5bbad5"/>
                <link rel="shortcut icon" href="/images/favicons/favicon.ico"/>
                <meta name="google-site-verification" content="PcZbHamu8N77ConcEm3oykmUEroNsJhpM6ZTrnvEO40" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="msapplication-config" content="/images/favicons/browserconfig.xml"/>
                <meta name="theme-color" content="#ffffff"/>

 {/*               <meta property="og:url" content="https://jasongallagher.org/" />
                <meta property="og:site_name" content="jasongallagher.org" />
                <meta property="og:title" content="Jason Gallagher, Front End Engineer in Berkeley, Ca" />
                <meta property="og:description" content="Full Stack Engineer in the San Francisco Bay Area specializing in Front End Development, React, Angular, Node.Js, Drupal, UI/UX." />*/}
{/*                <meta property="og:image" content="https://jasongallagher.org/#" />*/}

                {/*<meta name="twitter:card" content="#" />*/}
                {/*<meta name="twitter:site" content="@unleashit" />*/}
                {/*<meta name="twitter:title" content="Jason Gallagher, Front End Engineer in Berkeley, Ca" />*/}
                {/*<meta name="twitter:description" content="Full Stack Engineer in the San Francisco Bay Area specializing in Front End Development, React, Angular, Node.Js, Drupal, UI/UX." />*/}
                {/*<meta name="twitter:image" content="https://#" />*/}
                {head.link.toComponent()}
            </head>
            <body>
            <div id='root' dangerouslySetInnerHTML={{__html: this.props.content}}/>
            {this.renderEnvironment()}
            {this.renderInitialState()}
            {head.script.toComponent()}
            {this.renderMainScript()}
            </body>
            </html>
    );
    }
    }

    export default Root;
