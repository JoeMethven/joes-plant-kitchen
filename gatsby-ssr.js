import React from 'react';
import { Provider } from 'react-redux';
import store from './src/store';
import SnackbarProvider from './src/components/Snackbar';

export const wrapRootElement = ({ element }) => {
    return ( <Provider store={store}>
        <SnackbarProvider>{element}</SnackbarProvider>
    </Provider>
    );
};
