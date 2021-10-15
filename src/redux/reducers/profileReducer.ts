import { AnyAction } from "typescript-fsa";

import { clearProfile, setProfile, updateProfile } from "../actions";

export interface Mobile {
  country?: string;
  countryCode?: string;
  dialCode?: string;
  value?: string;
}

export interface Profile {
  fullname?: string;
  email?: string | null;
  address?: string;
  mobile?: Mobile;
  avatar?: string;
  banner?: string;
  dateJoined?: string;
  role?: string;
}

export interface File {
  bannerFile: string;
  avatarFile: string;
}

export type ProfileState = Profile;

export function profileReducer(state: ProfileState | undefined, action: AnyAction): ProfileState {
  if (state === undefined) {
    return {};
  }

  if (setProfile.match(action)) {
    return action.payload;
  }

  if (updateProfile.done.match(action)) {
    return { ...state, ...action.payload.result.updates };
  }

  if (clearProfile.match(action)) {
    return {};
  }

  return state;
}
