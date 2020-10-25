const path = require('path');

module.exports = {
    siteMetadata: {
        title: 'Gatsby Template',
        titleTemplate: '%s · Gatsby Template',
        description: 'A Gatsby Template.',
        url: 'https://gatsbytemplate.com',
        image: '/images/preview.png',
        author: 'Element Softworks',
        twitterUsername: '',
        authorLink: 'https://github.com/element-softworks',
    },
    plugins: [
        `gatsby-plugin-sharp`,
        `gatsby-transformer-sharp`,
        {
            resolve: 'gatsby-transformer-remark',
            options: {
                plugins: [
                    // 'gatsby-remark-copy-linked-files',
                    // 'gatsby-remark-relative-images',
                    {
                        resolve: 'gatsby-remark-images',
                        options: {
                            maxWidth: 1280,
                        },
                    },
                ],
            },
        },
        'gatsby-transformer-json',
        'gatsby-plugin-react-helmet',
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                path: `${__dirname}/src/pages`,
                name: 'pages',
            },
        },
        'gatsby-plugin-remove-trailing-slashes',
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: 'Gatsby Template',
                short_name: 'gatsby-template',
                start_url: '/',
                background_color: '#111111',
                theme_color: '#111111',
                display: 'standalone',
                icon: './static/images/favicon/android-chrome-512x512.png',
            },
        },
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /images/,
                },
            },
        },
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                typekit: {
                    id: 'fsd7jwi',
                },
            },
        },

        {
            resolve: 'gatsby-plugin-sass',
            options: {
                includePaths: [
                    `${__dirname}/node_modules`,
                    `${__dirname}/src/`,
                    `${__dirname}/src/styles`,
                ],
                precision: 8,
            },
        },
        // {
        //     resolve: 'gatsby-plugin-sentry',
        //     options: {
        //         dsn: 'DSN_ID',
        //         // Optional settings, see https://docs.sentry.io/clients/node/config/#optional-settings
        //         environment: process.env.NODE_ENV,
        //         enabled: (() => ['production'].indexOf(process.env.NODE_ENV) !== -1)(),
        //     },
        // },
        {
            resolve: `gatsby-plugin-alias-imports`,
            options: {
                alias: {
                    '@components': path.resolve(__dirname, 'src/components'),
                    '@reducers': path.resolve(__dirname, 'src/reducers'),
                    '@helpers': path.resolve(__dirname, 'src/helpers'),
                    '@actions': path.resolve(__dirname, 'src/actions'),
                    '@images': path.resolve(__dirname, 'src/images'),
                    '@styles': path.resolve(__dirname, 'src/styles'),
                    '@fonts': path.resolve(__dirname, 'src/fonts'),
                    '@views': path.resolve(__dirname, 'src/views'),
                    '@store': path.resolve(__dirname, 'src/store.js'),
                },
                extensions: [],
            },
        },
        'gatsby-plugin-offline',
    ],
};
