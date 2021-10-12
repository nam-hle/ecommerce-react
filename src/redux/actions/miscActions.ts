import actionCreatorFactory from "typescript-fsa";
const factory = actionCreatorFactory("MISC");

export const setLoading = factory<SetLoadingPayload>("LOADING");
export type SetLoadingPayload = boolean;

export const setAuthenticating = factory<SetAuthenticatingPayload>("IS_AUTHENTICATING");
export type SetAuthenticatingPayload = boolean;

export const setRequestStatus = factory<SetRequestStatusPayload>("SET_REQUEST_STATUS");
export type SetRequestStatusPayload = { message: string } | undefined;

export const setAuthStatus = factory<SetAuthStatusPayload>("SET_AUTH_STATUS");
export type SetAuthStatusPayload = AuthStatus;

export type AuthStatus = null | {
  success: boolean;
  isError?: boolean;
  type: string;
  message: string;
};
