import React, { Component } from 'react';

class Root extends Component {

  renderInitialState() {
    if (this.props.initialState) {
      const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
      return <script dangerouslySetInnerHTML={{__html: innerHtml}} />;
    }
  }

  renderEnvironment() {
    const innerHtml = `window.__ENVIRONMENT__ = '${__ENVIRONMENT__}'`;
    return <script dangerouslySetInnerHTML={{__html: innerHtml}} />
  }

  render() {
    const head = this.props.head;
    const productionCSS = process.env.NODE_ENV ? <link rel="stylesheet" href="/css/style.min.css" /> : '';
    const attrs = head.htmlAttributes.toComponent();

    return (
      <html {...attrs}>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {head.link.toComponent()}
          <link href='https://fonts.googleapis.com/css?family=Oswald|Sanchez' rel='stylesheet' type='text/css' />
          {productionCSS}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
          {this.renderEnvironment()}
          {this.renderInitialState()}
          {head.script.toComponent()}
          <script src={!process.env.NODE_ENV ? '/global.js' : '/js/global.min.js'}></script>

        </body>
      </html>
    );
  }
}

export default Root;
