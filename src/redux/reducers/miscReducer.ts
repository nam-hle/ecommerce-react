import { Reducer } from "redux";
import { IS_AUTHENTICATING, LOADING, SET_AUTH_STATUS, SET_REQUEST_STATUS } from "../../constants";
import {
  SetAuthenticatingPayload,
  SetAuthStatusPayload,
  SetLoadingPayload,
  SetRequestStatusPayload,
} from "../actions/miscActions";
import { ActionWithPayload } from ".";

export interface MiscState {
  loading: boolean;
  isAuthenticating: boolean;
  authStatus: string | null;
  requestStatus: string | null;
  theme: string;
}

const initState: MiscState = {
  loading: false,
  isAuthenticating: false,
  authStatus: null,
  requestStatus: null,
  theme: "light",
};

export type SetLoadingAction = ActionWithPayload<typeof LOADING, SetLoadingPayload>;
export type SetAuthenticatingAction = ActionWithPayload<typeof IS_AUTHENTICATING, SetAuthenticatingPayload>;
export type SetRequestStatusAction = ActionWithPayload<typeof SET_REQUEST_STATUS, SetRequestStatusPayload>;
export type SetAuthStatusAction = ActionWithPayload<typeof SET_AUTH_STATUS, SetAuthStatusPayload>;

export type MiscAction = SetLoadingAction | SetAuthenticatingAction | SetRequestStatusAction | SetAuthStatusAction;

export type MiscReducer = Reducer<MiscState, MiscAction>;

export const miscReducer = (state: MiscState = initState, action: MiscAction) => {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case IS_AUTHENTICATING:
      return {
        ...state,
        isAuthenticating: action.payload,
      };
    case SET_REQUEST_STATUS:
      return {
        ...state,
        requestStatus: action.payload,
      };
    case SET_AUTH_STATUS:
      return {
        ...state,
        authStatus: action.payload,
      };
    default:
      return state;
  }
};
