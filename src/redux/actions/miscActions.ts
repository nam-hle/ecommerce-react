import { IS_AUTHENTICATING, LOADING, SET_AUTH_STATUS, SET_REQUEST_STATUS } from "../../constants";

export type SetLoadingPayload = boolean;

export const setLoading = (bool = true) => ({
  type: LOADING,
  payload: bool,
});

export type SetAuthenticatingPayload = boolean;

export const setAuthenticating = (bool = true) => ({
  type: IS_AUTHENTICATING,
  payload: bool,
});

export type SetRequestStatusPayload = string | null;

export const setRequestStatus = (status: string) => ({
  type: SET_REQUEST_STATUS,
  payload: status,
});

export type SetAuthStatusPayload = string | null;

export const setAuthStatus = (status = null) => ({
  type: SET_AUTH_STATUS,
  payload: status,
});
