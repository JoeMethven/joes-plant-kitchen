import store from '@store';
import AxiosLibrary from 'axios';
import { isBefore, parseISO } from 'date-fns';
import { logoutUser, updateUser } from '@actions/user';
import { USER_REFRESH } from '@helpers/api';

const AxiosErrorInstance = AxiosLibrary.create();
export const Axios = AxiosLibrary.create();
const CancelToken = AxiosLibrary.CancelToken;
let cancel;

export const requestCancelled = error => AxiosLibrary.isCancel(error);

export const makeGetRequest = async (url, params = {}, config = {}) => {
    try {
        cancel && cancel();
        const user = store.getState().user;
        const websiteId = process.env.websiteId;
        const token = user?.token;
        const authorization = token ? { Authorization: 'Bearer ' + token } : {};

        return await Axios.get(url, {
            params: { ...params, websiteId },
            headers: authorization,
            timeout: 15000,
            ...config,
        });
    } catch (error) {
        if (requestCancelled(error)) throw 'cancelled';
        throw error?.response?.data;
    }
};

export const makePostRequest = async (url, data, params = {}, config = {}) => {
    try {
        cancel && cancel();
        params = !!params ? params : {};
        const user = store.getState().user;
        const websiteId = process.env.websiteId;
        const token = user?.token ?? '';
        const authorization = token ? { Authorization: 'Bearer ' + token } : {};

        return await Axios.post(url, data, {
            params: { ...params, websiteId },
            headers: authorization,
            ...config,
            timeout: 15000,
        });
    } catch (error) {
        if (requestCancelled(error)) throw 'cancelled';
        throw error?.response?.data;
    }
};

export const makePutRequest = async (url, data, params = {}, config = {}) => {
    try {
        cancel && cancel();
        params = !!params ? params : {};
        const user = store.getState().user;
        const websiteId = process.env.websiteId;
        const token = user && user.token;
        const authorization = token ? { Authorization: 'Bearer ' + token } : {};

        return await Axios.put(url, data, {
            params: { ...params, websiteId },
            headers: { ...authorization },
            ...config,
            timeout: 15000,
        });
    } catch (error) {
        if (requestCancelled(error)) throw 'cancelled';
        throw error?.response?.data;
    }
};

export const makeDeleteRequest = async (url, params = {}, config = {}) => {
    try {
        cancel && cancel();
        params = !!params ? params : {};
        const user = store.getState().user;
        const websiteId = process.env.websiteId;
        const token = user && user.token;
        const authorization = token ? { Authorization: 'Bearer ' + token } : {};

        return await Axios.delete(url, {
            params: { ...params, websiteId },
            headers: { ...authorization },
            ...config,
            timeout: 15000,
        });
    } catch (error) {
        if (requestCancelled(error)) throw 'cancelled';
        throw error?.response?.data;
    }
};

Axios.interceptors.request.use(config => {
    const user = store.getState().user;

    // prevent a user that no longer has a token from requesting any data (the token expired)
    if (user && user.expiry && isBefore(parseISO(user.expiry), new Date())) {
        store.dispatch(logoutUser());
    }

    try {
        return { ...config, cancelToken: new CancelToken(c => (cancel = c)) };
    } catch (error) {
        if (requestCancelled(error)) throw 'cancelled';
        throw error?.response?.data;
    }
});

// Add a response interceptor
Axios.interceptors.response.use(
    response => response,
    error => {
        return new Promise(async function(resolve, reject) {
            try {
                if (!error.response) {
                    console.log('NO ERROR RESPONSE', { error });
                    return reject(error);
                }

                if (
                    error.response.status === 401 &&
                    error.response.data &&
                    error.response.data.errorName === 'FailedToAuthenticateToken'
                ) {
                    console.log('Token refeshing...');
                    const user = store.getState().user;
                    const websiteId = process.env.websiteId;
                    const refreshToken = user?.refreshToken;
                    const { data: userData } = await AxiosErrorInstance.post(
                        USER_REFRESH,
                        {
                            userId: user?._id,
                            email: user?.email,
                        },
                        {
                            params: { websiteId },
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${refreshToken}`,
                            },
                        }
                    );
                    const newUser = { user: { ...user }, token: userData?.access_token };
                    await store.dispatch(updateUser(newUser));
                    error.config.headers.Authorization = `Bearer ${userData?.access_token}`;
                    AxiosErrorInstance(error.config).then(resolve, reject);
                } else {
                    reject(error);
                }
            } catch (error) {
                reject(error);
            }
        });
    }
);
