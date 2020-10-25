import { isBefore, addMonths, parseISO, formatISO } from 'date-fns';
import { bakeLocalStorage, deleteLocalStorage, readLocalStorage } from '@helpers/storage';

export default (state = readLocalStorage('user'), action) => {
    // Retrieve user from stored cookie
    // state = await AsyncStorage.getItem("user");
    let user, userExpiry, data, expiry;

    // Check to see what type of action is being fired
    switch (action.type) {
        case 'USER_LOGIN':
            user = action.payload.user;
            userExpiry = formatISO(addMonths(new Date(), 1));

            data = {
                ...user,
                token: action.payload.token,
                refreshToken: action.payload.refreshToken,
                expiry: userExpiry,
            };

            bakeLocalStorage('user', data);
            return data;
        case 'USER_LOGOUT':
            deleteLocalStorage('user');
            return null;
        // occurs when a user is logged in in a separate tab, and a request is made back in the old tab (the user still
        // appears as the old one, but the requests go throuh as a new one, this instead forces an update with the new
        // logged in user).
        case 'USER_UPDATE_FROM_TOKEN':
            expiry = state && state.expiry;
            bakeLocalStorage('user', { ...action.payload, expiry });
            return { ...action.payload, expiry };
        case 'USER_UPDATE':
            userExpiry = formatISO(addMonths(new Date(), 1));

            const token = action.payload.token || (state && state.token);
            const refreshToken = action.payload.refreshToken || (state && state.refreshToken);

            expiry =
                action.payload.token || action.payload.refreshToken
                    ? formatISO(addMonths(new Date(), 1))
                    : state && state.expiry;

            data = {
                ...(action.payload.user || action.payload),
                token,
                refreshToken,
                expiry,
            };

            bakeLocalStorage('user', data);
            return data;
        default:
            // remove user from existence if the user expiry is after the current date.
            // Note the API will already track this, so if they hack the localStorage expiry we'll still invalidate any
            // requests.
            if (
                state &&
                typeof state === 'object' &&
                state.expiry &&
                isBefore(parseISO(state.expiry), new Date())
            ) {
                deleteLocalStorage('user');
                return null;
            }

            // Return state by default if nothing else is met
            return state;
    }
};
