import { CLEAR_PROFILE, SET_PROFILE, UPDATE_EMAIL, UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS } from "../../constants";
import { Profile } from "../reducers/profileReducer";

export interface ClearProfilePayload {}

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
});

export type SetProfilePayload = Profile;

export const setProfile = (user: string) => ({
  type: SET_PROFILE,
  payload: user,
});

export const updateEmail = (password: string, newEmail: string) => ({
  type: UPDATE_EMAIL,
  payload: {
    password,
    newEmail,
  },
});

export const updateProfile = (newProfile: { updates: Profile; files: File; credentials: string }) => ({
  type: UPDATE_PROFILE,
  payload: {
    updates: newProfile.updates,
    files: newProfile.files,
    credentials: newProfile.credentials,
  },
});

export interface UpdateProfileSuccessPayload {
  updates: Profile;
}

export const updateProfileSuccess = (updates: string) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: updates,
});
