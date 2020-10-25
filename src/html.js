import React from 'react';

export default class HTML extends React.Component {
    render() {
        return (
            <html {...this.props.htmlAttributes} lang="en">
                <head>
                    <meta charSet="utf-8" />
                    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, shrink-to-fit=no"
                    />
                    <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
                    <script src="/admin/netlify_redirect.js" />
                    {this.props.headComponents}

                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/static/images/favicon/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/static/images/favicon/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/static/images/favicon/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/static/images/favicon/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/static/images/favicon/safari-pinned-tab.svg"
                        color="#3d5e67"
                    />
                    <link rel="shortcut icon" href="/static/images/favicon/favicon.ico" />
                    <meta name="msapplication-TileColor" content="#3d5e67" />
                    <meta
                        name="msapplication-config"
                        content="/static/images/favicon/browserconfig.xml"
                    />
                    <meta name="theme-color" content="#ffffff" />
                </head>
                <body {...this.props.bodyAttributes}>
                    {this.props.preBodyComponents}
                    <div
                        key={`body`}
                        id="___gatsby"
                        dangerouslySetInnerHTML={{ __html: this.props.body }}
                    />
                    {this.props.postBodyComponents}
                </body>
            </html>
        );
    }
}
