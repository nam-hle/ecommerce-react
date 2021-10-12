import { AnyAction } from "typescript-fsa";

import { signInSuccess, signOut } from "../actions";

export type AuthState = {
  id: string;
  role: string;
  provider?: string;
} | null;

export function authReducer(state: AuthState | undefined, action: AnyAction): AuthState {
  if (state === undefined) {
    return null;
  }

  if (signInSuccess.match(action)) {
    return {
      id: action.payload.id,
      role: action.payload.role,
      provider: action.payload.provider,
    };
  }

  if (signOut.done.match(action)) {
    return null;
  }

  return state;
}
