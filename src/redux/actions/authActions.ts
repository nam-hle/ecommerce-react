import actionCreatorFactory from "typescript-fsa";
import firebase from "firebase";

const factory = actionCreatorFactory("AUTH");

export const signIn = factory<SignInPayload>("SIGN_IN");
export interface SignInPayload {
  email: string;
  password: string;
}

export const signInWithGoogle = factory<SignInWithGooglePayload>("SIGN_IN_WITH_GOOGLE");
export interface SignInWithGooglePayload {}

export const signInWithFacebook = factory<SignInWithGooglePayload>("SIGN_IN_WITH_FACEBOOK");
export interface SignInWithFacebookPayload {}

export const signInWithGithub = factory<SignInWithGooglePayload>("SIGN_IN_WITH_GITHUB");
export interface SignInWithGithubPayload {}

export const signUp = factory<SignUpPayload>("SIGN_UP");
export interface SignUpPayload {
  email: string;
  password: string;
  fullname: string;
}

export const signInSuccess = factory<SignInSuccessPayload>("SIGN_IN_SUCCESS");
export interface SignInSuccessPayload {
  id: string;
  role: string;
  provider: string | undefined;
}

export const setAuthPersistence = factory<SetAuthPersistencePayload>("SET_AUTH_PERSISTENCE");
export interface SetAuthPersistencePayload {}

export const signOut = factory.async<SignOutParamPayload, SignOutSuccessPayload>("SIGN_OUT");
export interface SignOutSuccessPayload {}
export interface SignOutParamPayload {}

export const onAuthStateChanged = factory.async<
  OnAuthStateChangedParam,
  OnAuthStateChangedResult,
  OnAuthStateChangedError
>("AUTH_STATE_CHANGED");
export interface OnAuthStateChangedParam {}
export type OnAuthStateChangedResult = firebase.User;

export type OnAuthStateChangedError = string;

export const resetPassword = factory<ResetPasswordPayload>("RESET_PASSWORD");
export type ResetPasswordPayload = string;
