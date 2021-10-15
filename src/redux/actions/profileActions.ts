import actionCreatorFactory from "typescript-fsa";

import { Profile } from "../reducers";

const factory = actionCreatorFactory("PROFILE");

export const clearProfile = factory<ClearProfilePayload>("CLEAR_PROFILE");
export interface ClearProfilePayload {}

export type SetProfilePayload = Profile;

export const setProfile = factory<SetProfilePayload>("SET_PROFILE");

export const updateEmail = factory<UpdateEmailPayload>("UPDATE_EMAIL");
export interface UpdateEmailPayload {
  password: string;
  newEmail: string;
}

export const updateProfile = factory.async<UpdateProfilePayload, UpdateProfileSuccessPayload>("UPDATE_PROFILE");
export interface UpdateProfilePayload {
  updates: Partial<Profile>;
  files: ProfileFiles;
  credentials: Credentials;
}
export interface ProfileFiles {
  avatarFile?: File;
  bannerFile?: File;
}
export interface Credentials {
  email?: string;
  password?: string;
}
export interface UpdateProfileSuccessPayload {
  updates: Partial<Profile>;
}
