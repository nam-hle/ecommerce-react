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
} from "../actions/authActions";
import { searchProduct, removeProduct, addProduct, editProduct, getProducts } from "../actions/productActions";
import { updateEmail, updateProfile } from "../actions/profileActions";
import authSaga from "./authSaga";
import productSaga from "./productSaga";
import profileSaga from "./profileSaga";

function* rootSaga() {
  yield takeLatest((action: AnyAction) => {
    return [
      signIn,
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
      [
        addProduct.started,
        addProduct.done,
        searchProduct.started,
        searchProduct.done,
        removeProduct.started,
        removeProduct.done,
        editProduct.started,
        editProduct.done,
        getProducts.started,
        getProducts.done,
      ].some((a) => a.match(action)),
    productSaga
  );

  yield takeLatest(
    (action: AnyAction) => [updateEmail, updateProfile.started, updateProfile.done].some((a) => a.match(action)),
    profileSaga
  );
}

export default rootSaga;
