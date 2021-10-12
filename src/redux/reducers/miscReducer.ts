import { AnyAction } from "typescript-fsa";

import { AuthStatus, setAuthenticating, setAuthStatus, setLoading, setRequestStatus } from "../actions";

export interface MiscState {
  loading: boolean;
  isAuthenticating: boolean;
  authStatus: AuthStatus;
  requestStatus: { message: string } | undefined;
  theme: string;
}

const initState: MiscState = {
  loading: false,
  isAuthenticating: false,
  authStatus: null,
  requestStatus: undefined,
  theme: "light",
};

export function miscReducer(state: MiscState | undefined, action: AnyAction): MiscState {
  if (state === undefined) {
    return initState;
  }

  if (setLoading.match(action)) {
    return {
      ...state,
      loading: action.payload,
    };
  }

  if (setAuthenticating.match(action)) {
    return {
      ...state,
      isAuthenticating: action.payload,
    };
  }

  if (setRequestStatus.match(action)) {
    return {
      ...state,
      requestStatus: action.payload,
    };
  }

  if (setAuthStatus.match(action)) {
    return {
      ...state,
      authStatus: action.payload,
    };
  }

  return state;
}
