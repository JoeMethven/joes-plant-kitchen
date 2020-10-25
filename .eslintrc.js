module.exports = {
    globals: {
        __PATH_PREFIX__: true,
        "Sentry": true
    },
    parser: 'babel-eslint',
    extends: ['plugin:lodash/recommended', 'airbnb', 'prettier', 'prettier/react', 'react-app'],
    plugins: ['lodash', 'react', 'prettier'],
    settings: {
        'import/resolver': {
            webpack: {
                config: './webpack.babel.js',
            },
        },
    },
    env: {
        browser: true,
        node: true,
        jest: true,
        es6: true,
    },
    overrides: [
        {
            files: ['*.test.js'],
            rules: {
                'no-undef': 0,
                'react/react-in-jsx-scope': 0,
                'react/jsx-no-undef': 0,
            },
        },
    ],
    rules: {
        'import/no-named-as-default': 0,
        'no-return-assign': 0,
        'global-require': 'off',
        'consistent-return': 0,
        'no-console': 'off',
        'no-underscore-dangle': 'off',
        'function-paren-newline': 'off',
        'react/require-default-props': 0,
        'react/destructuring-assignment': 0,
        'react/jsx-filename-extension': [
            'error',
            {
                extensions: ['.js', '.jsx'],
            },
        ],
        'import/no-cycle': 'off',
        'import/no-extraneous-dependencies': [
            'error',
            {
                devDependencies: true,
            },
        ],
        'lodash/prefer-lodash-method': 'off',
        'lodash/prefer-lodash-typecheck': 'off',
        'lodash/import-scope': 'off',
        'lodash/prefer-noop': 'off',
        quotes: [2, 'single', { avoidEscape: true }],
    },
};
