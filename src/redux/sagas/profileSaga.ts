import { SagaIterator } from "redux-saga";
import { call, put, select } from "redux-saga/effects";
import { AnyAction } from "typescript-fsa";

import { ACCOUNT } from "../../constants";
import { displayActionMessage } from "../../helpers";
import { history } from "../../routers/AppRouter";
import firebase from "../../services/firebase";
import { updateEmail, updateProfile, setLoading } from "../actions";
import { Profile } from "../reducers";

interface ProfileError extends Error {
  code: string;
}

export function* profileSaga(action: AnyAction): SagaIterator {
  if (updateEmail.match(action)) {
    try {
      yield put(setLoading(false));
      yield call(firebase.updateEmail, action.payload.password, action.payload.newEmail);

      yield put(setLoading(false));
      yield call(history.push, "/profile");
      yield call(displayActionMessage, "Email Updated Successfully!", "success");
    } catch (e) {
      console.log((e as ProfileError).message);
    }
    return;
  }

  if (updateProfile.started.match(action)) {
    try {
      const state = yield select();
      const { email, password } = action.payload.credentials;
      const { avatarFile, bannerFile } = action.payload.files;

      yield put(setLoading(true));

      // if email & password exist && the email has been edited
      // update the email
      if (email && password && email !== state.profile.email) {
        yield call(firebase.updateEmail, password, email);
      }

      if (avatarFile || bannerFile) {
        const bannerURL = bannerFile
          ? yield call(firebase.storeImage, state.auth.id, "banner", bannerFile)
          : action.payload.updates.banner;
        const avatarURL = avatarFile
          ? yield call(firebase.storeImage, state.auth.id, "avatar", avatarFile)
          : action.payload.updates.avatar;
        const updates: Profile = { ...action.payload.updates, avatar: avatarURL, banner: bannerURL };

        yield call(firebase.updateProfile, state.auth.id, updates);
        yield put(updateProfile.done({ params: action.payload, result: { updates } }));
      } else {
        yield call(firebase.updateProfile, state.auth.id, action.payload.updates);
        yield put(updateProfile.done({ params: action.payload, result: { updates: action.payload.updates } }));
      }

      yield put(setLoading(false));
      yield call(history.push, ACCOUNT);
      yield call(displayActionMessage, "Profile Updated Successfully!", "success");
    } catch (e) {
      console.log(e);
      yield put(setLoading(false));
      if ((e as ProfileError).code === "auth/wrong-password") {
        yield call(displayActionMessage, "Wrong password, profile update failed :(", "error");
      } else {
        yield call(displayActionMessage, `:( Failed to update profile. ${(e as ProfileError).message ?? ""}`, "error");
      }
    }
    return;
  }

  throw new Error("Unexpected action type.");
}
