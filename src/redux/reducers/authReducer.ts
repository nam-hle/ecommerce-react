import { AnyAction } from "typescript-fsa";

import { signIn, signOut } from "../actions";

export type AuthState = {
  id: string;
  role: string;
  provider?: string;
} | null;

export function authReducer(state: AuthState | undefined, action: AnyAction): AuthState {
  if (state === undefined) {
    return null;
  }

  if (signIn.done.match(action)) {
    return {
      ...action.payload.result,
    };
  }

  if (signOut.done.match(action)) {
    return null;
  }

  return state;
}
