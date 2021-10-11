import { CLEAR_PROFILE, SET_PROFILE, UPDATE_PROFILE_SUCCESS } from "../../constants";
import { ClearProfilePayload, SetProfilePayload, UpdateProfileSuccessPayload } from "../actions/profileActions";
import { ActionWithPayload } from "./index";

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
  email?: string;
  address?: string;
  mobile?: any;
  avatar?: any;
  banner?: any;
  dateJoined?: number;
}

export interface File {
  bannerFile: string;
  avatarFile: string;
}

export interface ProfileState extends Profile {
  files?: File[];
  credentials?: string[];
}

export type SetProfileAction = ActionWithPayload<typeof SET_PROFILE, SetProfilePayload>;
export type UpdateProfileSuccessAction = ActionWithPayload<typeof UPDATE_PROFILE_SUCCESS, UpdateProfileSuccessPayload>;
export type ClearProfileAction = ActionWithPayload<typeof CLEAR_PROFILE, ClearProfilePayload>;

export type ProfileAction = SetProfileAction | UpdateProfileSuccessAction | ClearProfileAction;

export default (state: ProfileState = {}, action: ProfileAction) => {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload;
    case UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };
    case CLEAR_PROFILE:
      return {};
    default:
      return state;
  }
};
