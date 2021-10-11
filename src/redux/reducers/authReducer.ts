import { SIGNIN_SUCCESS, SIGNOUT_SUCCESS } from "../../constants";
import { SignInSuccessPayload, SignOutSuccessPayload } from "../actions/authActions";
import { ActionWithPayload } from "./index";

export type AuthState = {
  id: string;
  role: string;
  provider: string;
} | null;

const initState: AuthState = null;

export type SignInSuccessAction = ActionWithPayload<typeof SIGNIN_SUCCESS, SignInSuccessPayload>;
export type SignOutSuccessAction = ActionWithPayload<typeof SIGNOUT_SUCCESS, SignOutSuccessPayload>;

export type AuthAction = SignInSuccessAction | SignOutSuccessAction;

export default (state = initState, action: AuthAction) => {
  switch (action.type) {
    case SIGNIN_SUCCESS:
      return {
        id: action.payload.id,
        role: action.payload.role,
        provider: action.payload.provider,
      };
    case SIGNOUT_SUCCESS:
      return null;
    default:
      return state;
  }
};
