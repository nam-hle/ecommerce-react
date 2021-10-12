import { AnyAction } from "typescript-fsa";

import { clearProfile, setProfile, updateProfile } from "../actions";

// const initState = {
//   fullname: 'Pedro Juan',
//   email: 'juanpedro@gmail.com',
//   address: '',
//   mobile: {},
//   avatar: profile,
//   banner,
//   dateJoined: 1954234787348
// };

export interface Profile {
  fullname?: string;
  email?: string | null;
  address?: string;
  mobile?: any;
  avatar?: any;
  banner?: any;
  dateJoined?: string;
}

export interface File {
  bannerFile: string;
  avatarFile: string;
}

export interface ProfileState extends Profile {
  files?: File[];
  credentials?: string[];
}

export function profileReducer(state: ProfileState | undefined, action: AnyAction): ProfileState {
  if (state === undefined) {
    return {};
  }

  if (setProfile.match(action)) {
    return action.payload;
  }

  if (updateProfile.done.match(action)) {
    return { ...state, ...action.payload.result };
  }

  if (clearProfile.match(action)) {
    return {};
  }

  return state;
}
