export const getApiServer = () => {
    if (process.env.API_URL) {
        return process.env.API_URL;
    }

    if (process.env.NODE_ENV === 'development') {
        return 'http://localhost:3001';
    }

    return 'https://api2.merlinpanel.com';
};

export const API_ROUTE = getApiServer();

export const BASKET_ADD = basketId => `${API_ROUTE}/client/checkout/${basketId}`;
export const BASKET_CREATE = `${API_ROUTE}/client/checkout`;

export const CHECKOUT_SHIPPING = basketId => `${API_ROUTE}/client/checkout/${basketId}/shipping`;
export const CHECKOUT_BILLING = basketId => `${API_ROUTE}/client/checkout/${basketId}/billing`;
export const CHECKOUT_RATES = basketId => `${API_ROUTE}/client/checkout/${basketId}/rates`;
export const CHECKOUT_COMPLETE = basketId => `${API_ROUTE}/client/checkout/${basketId}/complete`;
export const CHECKOUT_ORDER = basketId => `${API_ROUTE}/client/checkout/${basketId}`;

export const STORE_ORDERS = `${API_ROUTE}/client/order`;
export const STORE_ORDER = id => `${API_ROUTE}/client/order/${id}`;

export const COUNTRIES = `${API_ROUTE}/lists/countries`;

export const USER_LOGIN = `${API_ROUTE}/client/auth/login`;
export const USER_REGISTER = `${API_ROUTE}/client/auth/register`;
export const USER_REFRESH = `${API_ROUTE}/client/auth/refresh`;
export const USER_PROFILE = `${API_ROUTE}/client/account`;
export const USER_AVATAR = `${API_ROUTE}/client/account/avatar`;
export const USER_PASSWORD_RESET = `${API_ROUTE}/client/auth/password/reset/request`;
export const USER_PASSWORD_RESET_COMPLETE = `${API_ROUTE}/client/auth/password/reset/complete`;
export const USER_PASSWORD_REPLACE = `${API_ROUTE}/client/auth/password/replace`;
export const USER_EMAIL_CHANGE = `${API_ROUTE}/client/auth/email/change/request`;
export const USER_EMAIL_CHANGE_COMPLETE = `${API_ROUTE}/client/auth/email/change/complete`;
export const USER_EMAIL_NEW_USER = `${API_ROUTE}/client/auth/email/conciergeSetup`;

export const EMAIL_VERIFY = `${API_ROUTE}/client/auth/email/verify`;
export const EMAIL_VERIFY_RESEND = `${API_ROUTE}/client/auth/email/resendVerify`;
