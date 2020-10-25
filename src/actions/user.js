import { getUserFromToken } from '../helpers/auth';

export function loginUser(data) {
    return async dispatch => {
        try {
            const userData = await getUserFromToken(data);
            const { user, token, refreshToken } = userData;

            return dispatch({
                type: 'USER_LOGIN',
                payload: {
                    user,
                    token,
                    refreshToken,
                },
            });
        } catch (error) {
            throw error;
        }
    };
}

export function logoutUser() {
    // Logout a user and delete any cookies related to signin
    return dispatch => {
        dispatch({
            type: 'WEBSITE_REMOVE',
        });

        dispatch({
            type: 'USER_LOGOUT',
        });
    };
}

export function updateUser(user) {
    return {
        type: 'USER_UPDATE',
        payload: user,
    };
}
