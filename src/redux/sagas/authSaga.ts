import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import { AnyAction } from "typescript-fsa";

import defaultAvatar from "../../../static/defaultAvatar.jpg";
import defaultBanner from "../../../static/defaultBanner.jpg";
import { SIGNIN } from "../../constants";
import { history } from "../../routers/AppRouter";
import firebase from "../../services/firebase";
import {
  onAuthStateChanged,
  resetPassword,
  setAuthPersistence,
  signIn,
  signInWithFacebook,
  signInWithGithub,
  signInWithGoogle,
  signOut,
  signUp,
  resetCheckout,
  resetFilter,
  setAuthenticating,
  setAuthStatus,
  SetAuthStatusPayload,
  clearProfile,
  setProfile,
  clearBasket,
  setBasketItems,
} from "../actions";

type AuthError = {
  code: string;
  message?: string;
};

function* handleError(e: AuthError) {
  const obj: Omit<NonNullable<SetAuthStatusPayload>, "message"> = { success: false, type: "auth", isError: true };
  yield put(setAuthenticating(false));

  switch (e.code) {
    case "auth/network-request-failed":
      yield put(setAuthStatus({ ...obj, message: "Network error has occurred. Please try again." }));
      break;
    case "auth/email-already-in-use":
      yield put(setAuthStatus({ ...obj, message: "Email is already in use. Please use another email" }));
      break;
    case "auth/wrong-password":
      yield put(setAuthStatus({ ...obj, message: "Incorrect email or password" }));
      break;
    case "auth/user-not-found":
      yield put(setAuthStatus({ ...obj, message: "Incorrect email or password" }));
      break;
    case "auth/reset-password-error":
      yield put(
        setAuthStatus({ ...obj, message: "Failed to send password reset email. Did you type your email correctly?" })
      );
      break;
    default:
      yield put(setAuthStatus({ ...obj, message: e.message || "Unknown message" }));
      break;
  }
}

function* initRequest() {
  yield put(setAuthenticating(true));
  yield put(setAuthStatus(null));
}

export function* authSaga(action: AnyAction): SagaIterator {
  if (signIn.started.match(action)) {
    try {
      yield call(initRequest);
      yield call(firebase.signIn, action.payload.email, action.payload.password);
    } catch (e: unknown) {
      yield call(handleError, e as AuthError);
    }
    return;
  }

  if (signInWithGoogle.match(action)) {
    try {
      yield call(initRequest);
      yield call(firebase.signInWithGoogle);
    } catch (e) {
      yield call(handleError, e as AuthError);
    }
    return;
  }

  if (signInWithFacebook.match(action)) {
    try {
      yield call(initRequest);
      yield call(firebase.signInWithFacebook);
    } catch (e) {
      yield call(handleError, e as AuthError);
    }
    return;
  }

  if (signInWithGithub.match(action)) {
    try {
      yield call(initRequest);
      yield call(firebase.signInWithGithub);
    } catch (e) {
      yield call(handleError, e as AuthError);
    }
    return;
  }

  if (signUp.match(action)) {
    try {
      yield call(initRequest);

      const ref = yield call(firebase.createAccount, action.payload.email, action.payload.password);

      const fullname = action.payload.fullname
        .split(" ")
        .map((name) => name[0].toUpperCase().concat(name.substring(1)))
        .join(" ");
      const user = {
        fullname,
        avatar: defaultAvatar,
        banner: defaultBanner,
        email: action.payload.email,
        address: "",
        basket: [],
        mobile: {},
        role: "USER",
        dateJoined: ref.user.metadata.creationTime || new Date().getTime(),
      };

      yield call(firebase.addUser, ref.user.uid, user);

      yield put(setProfile(user));
      yield put(setAuthenticating(false));
    } catch (e) {
      yield call(handleError, e as AuthError);
    }
    return;
  }

  if (signOut.started.match(action)) {
    try {
      yield call(initRequest);
      yield call(firebase.signOut);
      yield put(clearBasket({}));
      yield put(clearProfile({}));
      yield put(resetFilter({}));
      yield put(resetCheckout({}));
      yield put(signOut.done({ params: {}, result: {} }));
      yield put(setAuthenticating(false));
      yield call(history.push, SIGNIN);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  if (resetPassword.match(action)) {
    try {
      yield call(initRequest);
      yield call(firebase.passwordReset, action.payload);
      yield put(
        setAuthStatus({
          success: true,
          isError: false,
          type: "reset",
          message: "Password reset email has been sent to your provided email.",
        })
      );
      yield put(setAuthenticating(false));
    } catch (e) {
      yield call(handleError, { code: "auth/reset-password-error" });
    }
    return;
  }

  if (onAuthStateChanged.done.match(action)) {
    const snapshot = yield call(firebase.getUser, action.payload.result.uid);

    if (snapshot.data()) {
      // if user exists in database
      const user = snapshot.data();

      yield put(setProfile(user));
      yield put(setBasketItems(user.basket));
      yield put(
        signIn.done({
          params: user,
          result: {
            id: action.payload.result.uid,
            role: user.role,
            provider: action.payload.result.providerData[0]?.providerId,
          },
        })
      );
    } else if (action.payload.result.providerData[0]?.providerId !== "password" && !snapshot.data()) {
      // add the user if auth provider is not password
      const user = {
        fullname: action.payload.result.displayName ?? "User",
        avatar: action.payload.result.photoURL ?? defaultAvatar,
        banner: defaultBanner,
        email: action.payload.result.email,
        address: "",
        basket: [],
        mobile: undefined,
        role: "USER",
        dateJoined: action.payload.result.metadata.creationTime,
      };
      yield call(firebase.addUser, action.payload.result.uid, user);
      yield put(setProfile(user));
      yield put(
        signIn.done(
          // @ts-ignore
          {
            result: {
              id: action.payload.result.uid,
              role: user.role,
              provider: action.payload.result.providerData[0]?.providerId,
            },
          }
        )
      );
    }

    yield put(
      setAuthStatus({
        success: true,
        type: "auth",
        isError: false,
        message: "Successfully signed in. Redirecting...",
      })
    );
    yield put(setAuthenticating(false));
    return;
  }

  if (onAuthStateChanged.failed.match(action)) {
    yield put(clearProfile({}));
    yield put(signOut.done({ params: {}, result: {} }));
    return;
  }

  if (setAuthPersistence.match(action)) {
    try {
      yield call(firebase.setAuthPersistence);
    } catch (e) {
      console.log(e);
    }
    return;
  }

  throw new Error("AuthSaga.ts/Unexpected Action Type.");
}
