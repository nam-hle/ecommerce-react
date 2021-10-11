import actionCreatorFactory from "typescript-fsa";
import { Profile } from "../reducers/profileReducer";

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
  updates: Profile;
  files: File;
  credentials: string;
}
export interface UpdateProfileSuccessPayload {
  updates: Profile;
}
