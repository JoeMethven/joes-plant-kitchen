import React  from 'react';
import { Provider } from 'react-redux';
import SnackbarProvider from './src/components/Snackbar';

import store from './src/store';

if (process.env.NODE_ENV === 'production') {
    // ReactGA.initialize('UA-000000000-0');
    // ReactGA.pageview(window.location.pathname + window.location.search);
}

export const wrapRootElement = ({ element }) => {
    return (
        <Provider store={store}>
            <SnackbarProvider>{element}</SnackbarProvider>
        </Provider>
    );
};

export const onRouteUpdate = ({ location, prevLocation }) => {
    // if (process.env.NODE_ENV === 'production') {
    //     ReactGA.pageview(window.location.pathname + window.location.search);
    // }
};
