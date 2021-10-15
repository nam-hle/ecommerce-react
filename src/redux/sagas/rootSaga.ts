import { SagaIterator } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import { AnyAction } from "typescript-fsa";

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
  searchProduct,
  removeProduct,
  addProduct,
  editProduct,
  getProducts,
  updateEmail,
  updateProfile,
} from "../actions";

import { authSaga } from "./authSaga";
import { productSaga } from "./productSaga";
import { profileSaga } from "./profileSaga";

export function* rootSaga(): SagaIterator {
  yield takeLatest((action: AnyAction) => {
    return [
      signIn.started,
      signUp,
      signOut.started,
      signInWithFacebook,
      signInWithGoogle,
      signInWithGithub,
      onAuthStateChanged.started,
      onAuthStateChanged.failed,
      onAuthStateChanged.done,
      setAuthPersistence,
      resetPassword,
    ].some((a) => a.match(action));
  }, authSaga);

  yield takeLatest(
    (action: AnyAction) =>
      [addProduct.started, searchProduct.started, removeProduct.started, editProduct.started, getProducts.started].some(
        (a) => a.match(action)
      ),
    productSaga
  );

  yield takeLatest(
    (action: AnyAction) => [updateEmail, updateProfile.started].some((a) => a.match(action)),
    profileSaga
  );
}
