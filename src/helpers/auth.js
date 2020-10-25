import { USER_PROFILE, USER_REFRESH } from './api';
import { updateUser } from '@actions/user';
import { Axios } from '@helpers/requests';
import store from '../store';

export function getUserFromNewToken() {
    const user = store.getState().user;
    const refreshToken = user && user.refreshToken;
    const websiteId = process.env.websiteId;
    let token = null;
    return new Promise((resolve, reject) => {
        Axios.post(
            USER_REFRESH,
            { email: user.email, userId: user._id },
            { params: { websiteId }, headers: { Authorization: 'Bearer ' + refreshToken } }
        )
            .then(response => {
                token = response.data.access_token;
                return Axios.get(USER_PROFILE, {
                    params: { websiteId },
                    headers: { Authorization: 'Bearer ' + token },
                });
            })
            .then(response => {
                const user = response.data;
                store.dispatch(updateUser({ user, token, refreshToken }));
                resolve({ user, token, refreshToken });
            })
            .catch(err => {
                reject(err);
            });
    });
}

export function getUserFromToken(data) {
    const user = store.getState().user;
    const websiteId = process.env.websiteId;
    let token = data?.access_token ?? user?.token;
    let refreshToken = data?.refresh_token ?? user?.refreshToken;

    // A token has been returned from the server, we now get user information using said token
    return new Promise((resolve, reject) => {
        Axios.get(USER_PROFILE, {
            params: { websiteId },
            headers: { Authorization: 'Bearer ' + token },
        })
            .then(response => {
                // Store this response data in a object and resolve it
                resolve({
                    user: response.data,
                    token,
                    refreshToken,
                });
            })
            .catch(error => {
                reject(false);
            });
    });
}
