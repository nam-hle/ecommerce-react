export enum EProductActionType {
    GET_PRODUCTS = 'GET_PRODUCTS',
    GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS',
    ADD_PRODUCT = 'ADD_PRODUCT',
    ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS',
    REMOVE_PRODUCT = 'REMOVE_PRODUCT',
    REMOVE_PRODUCT_SUCCESS = 'REMOVE_PRODUCT_SUCCESS',
    EDIT_PRODUCT = 'EDIT_PRODUCT',
    EDIT_PRODUCT_SUCCESS = 'EDIT_PRODUCT_SUCCESS',
    CANCEL_GET_PRODUCTS = 'CANCEL_GET_PRODUCTS',
    SET_LAST_REF_KEY = 'SET_LAST_REF_KEY'
}

export enum EBasketActionType {
    ADD_TO_BASKET = 'ADD_TO_BASKET',
    REMOVE_FROM_BASKET = 'REMOVE_FROM_BASKET',
    CLEAR_BASKET = 'CLEAR_BASKET',
    ADD_QTY_ITEM = 'ADD_QTY_ITEM',
    MINUS_QTY_ITEM = 'MINUS_QTY_ITEM'
}

export enum ECheckOutActionType {
    SET_CHECKOUT_SHIPPING_DETAILS = 'SET_CHECKOUT_SHIPPING_DETAILS',
    SET_CHECKOUT_PAYMENT_DETAILS = 'SET_CHECKOUT_PAYMENT_DETAILS',
    RESET_CHECKOUT = 'RESET_CHECKOUT'
}

export enum EAuthActionType {
    SIGNIN = 'SIGNIN',
    SIGNIN_SUCCESS = 'SIGNIN_SUCCESS',
    SIGNUP = 'SIGNUP',
    SIGNUP_SUCCESS = 'SIGNUP_SUCCESS',
    SIGNOUT = 'SIGNOUT',
    SIGNOUT_SUCCESS = 'SIGNOUT_SUCCESS',
    SET_AUTH_STATUS = 'SET_AUTH_STATUS',
    SIGNIN_WITH_GOOGLE = 'SIGNIN_WITH_GOOGLE',
    SIGNIN_WITH_FACEBOOK = 'SIGNIN_WITH_FACEBOOK',
    SIGNIN_WITH_GITHUB = 'SIGNIN_WITH_GITHUB',
    ON_AUTHSTATE_CHANGED = 'ON_AUTHSTATE_CHANGED',
    SET_AUTH_PERSISTENCE = 'SET_AUTH_PERSISTENCE',
    ON_AUTHSTATE_SUCCESS = 'ON_AUTHSTATE_SUCCESS',
    ON_AUTHSTATE_FAIL = 'ON_AUTHSTATE_FAIL',
    RESET_PASSWORD = 'RESET_PASSWORD'
}

export enum EProfileActionType {
    UPDATE_EMAIL = 'UPDATE_EMAIL',
    SET_PROFILE = 'SET_PROFILE',
    UPDATE_PROFILE = 'UPDATE_PROFILE',
    UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
    CLEAR_PROFILE = 'CLEAR_PROFILE'
}
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const SET_PROFILE = 'SET_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS';
export const CLEAR_PROFILE = 'CLEAR_PROFILE';

export enum EFilterActionType {
    SET_TEXT_FILTER = 'SET_TEXT_FILTER',
    SET_BRAND_FILTER = 'SET_BRAND_FILTER',
    SET_MIN_PRICE_FILTER = 'SET_MIN_PRICE_FILTER',
    SET_MAX_PRICE_FILTER = 'SET_MAX_PRICE_FILTER',
    RESET_FILTER = 'RESET_FILTER',
    APPLY_FILTER = 'APPLY_FILTER',
    CLEAR_RECENT_SEARCH = 'CLEAR_RECENT_SEARCH',
    REMOVE_SELECTED_RECENT = 'REMOVE_SELECTED_RECENT'
}

export enum EUserActionType {
    REGISTER_USER = 'REGISTER_USER',
    GET_USER = 'GET_USER',
    ADD_USER = 'ADD_USER',
    DELETE_USER = 'DELETE_USER',
    EDIT_USER = 'EDIT_USER'

}

export enum EMiscActionType {
    LOADING = 'LOADING',
    IS_AUTHENTICATING = 'IS_AUTHENTICATING',
    SET_REQUEST_STATUS = 'SET_REQUEST_STATUS'
}

export const ROLE_USER = 'USER';
export const ROLE_ADMIN = 'ADMIN';

export const THEME_DEFAULT = 'LIGHT';
export const THEME_DARK = 'DARK';

export const PAYPAL = 'PAYPAL';
export const CREDIT = 'CREDIT';