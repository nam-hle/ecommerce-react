import actionCreatorFactory from "typescript-fsa";
import * as type from "../../constants";

export const factory = actionCreatorFactory("AUTH");

export const signIn = (email: string, password: string) => ({
  type: type.SIGNIN,
  payload: {
    email,
    password,
  },
});

export const signInWithGoogle = () => ({
  type: type.SIGNIN_WITH_GOOGLE,
});

export const signInWithFacebook = () => ({
  type: type.SIGNIN_WITH_FACEBOOK,
});

export const signInWithGithub = () => ({
  type: type.SIGNIN_WITH_GITHUB,
});

export const signUp = (user: string) => ({
  type: type.SIGNUP,
  payload: user,
});

export interface SignInSuccessPayload {
  id: string;
  role: string;
  provider: string;
}

export const signInSuccess = (auth: SignInSuccessPayload) => ({
  type: type.SIGNIN_SUCCESS,
  payload: auth,
});

export const setAuthPersistence = () => ({
  type: type.SET_AUTH_PERSISTENCE,
});

export const signOut = () => ({
  type: type.SIGNOUT,
});

export interface SignOutSuccessPayload {}

export const signOutSuccess = () => ({
  type: type.SIGNOUT_SUCCESS,
});

export const onAuthStateChanged = () => ({
  type: type.ON_AUTHSTATE_CHANGED,
});

export const onAuthStateSuccess = (user: string) => ({
  type: type.ON_AUTHSTATE_SUCCESS,
  payload: user,
});

export const onAuthStateFail = (error: Error) => ({
  type: type.ON_AUTHSTATE_FAIL,
  payload: error,
});

export const resetPassword = (email: string) => ({
  type: type.RESET_PASSWORD,
  payload: email,
});
