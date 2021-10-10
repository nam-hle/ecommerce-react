import { CLEAR_PROFILE, SET_PROFILE, UPDATE_EMAIL, UPDATE_PROFILE, UPDATE_PROFILE_SUCCESS } from "../../constants";

export const clearProfile = () => ({
  type: CLEAR_PROFILE,
});

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

export interface Profile {
  fullname: string;
  email: string;
  address: string;
  avatar: string;
  banner: string;
}

export interface File {
  bannerFile: string;
  avatarFile: string;
}

export const updateProfile = (newProfile: { updates: Profile; files: File; credentials: string }) => ({
  type: UPDATE_PROFILE,
  payload: {
    updates: newProfile.updates,
    files: newProfile.files,
    credentials: newProfile.credentials,
  },
});

export const updateProfileSuccess = (updates: string) => ({
  type: UPDATE_PROFILE_SUCCESS,
  payload: updates,
});
