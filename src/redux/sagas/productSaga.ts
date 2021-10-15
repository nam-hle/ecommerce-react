import { SagaIterator } from "redux-saga";
import { all, call, put, select } from "redux-saga/effects";
import { AnyAction } from "typescript-fsa";

import { ADMIN_PRODUCTS } from "../../constants";
import { displayActionMessage } from "../../helpers";
import { history } from "../../routers/AppRouter";
import firebase from "../../services/firebase";
import {
  addProduct,
  clearSearchState,
  editProduct,
  EditProductPayload,
  getProducts,
  ImageFile,
  removeProduct,
  searchProduct,
  setLoading,
  setRequestStatus,
} from "../actions";
import { Product } from "../reducers";

function* initRequest(): SagaIterator {
  yield put(setLoading(true));
  yield put(setRequestStatus(undefined));
}

export interface ProductError extends Error {}

function* handleError(e: ProductError) {
  yield put(setLoading(false));
  yield put(setRequestStatus({ message: e.message || "Failed to fetch products" }));
  console.log("ERROR: ", e);
}

function* handleAction(location: string | undefined, message: string, status: string) {
  if (location) {
    yield call(history.push, location);
  }
  yield call(displayActionMessage, message, status);
}

export function* productSaga(action: AnyAction): SagaIterator {
  if (getProducts.started.match(action)) {
    try {
      yield call(initRequest);
      const state = yield select();
      const result: { items?: Product[]; lastKey: string; total: number } = yield call(
        firebase.getProducts,
        action.payload
      );

      if (result.items?.length === 0) {
        handleError(new Error("No items found."));
      } else {
        yield put(
          getProducts.done({
            params: action.payload,
            result: {
              items: result.items ?? [],
              lastRefKey: result.lastKey ? result.lastKey : state.products.lastRefKey,
              total: result.total ? result.total : state.products.total,
            },
          })
        );
        yield put(setRequestStatus({ message: "" }));
      }
      yield put(setLoading(false));
    } catch (e) {
      console.log(e);
      yield call(handleError, e as ProductError);
    }
    return;
  }

  if (addProduct.started.match(action)) {
    try {
      yield call(initRequest);

      const { imageCollection } = action.payload;
      const key: string = yield call(firebase.generateKey);
      const downloadURL = yield call(firebase.storeImage, key, "products", action.payload.image);
      const image = { id: key, url: downloadURL };
      let images: { id: string; url: string }[] = [];

      if (imageCollection.length !== 0 && imageCollection.every((e) => e.file)) {
        const imageKeys: string[] = yield all(imageCollection.map(() => call(firebase.generateKey)));
        const imageUrls: string[] = yield all(
          imageCollection.map((img, i) => call(firebase.storeImage, imageKeys[i], "products", img.file || ""))
        );
        images = imageUrls.map((url, i) => ({ id: imageKeys[i], url }));
      }

      const product: Product = {
        ...action.payload,
        image: downloadURL,
        imageCollection: [image, ...images],
      };

      yield call(firebase.addProduct, key, product);
      yield put(
        addProduct.done({
          params: action.payload,
          result: {
            ...product,
            id: key,
          },
        })
      );
      yield call(handleAction, ADMIN_PRODUCTS, "Item succesfully added", "success");
      yield put(setLoading(false));
    } catch (e) {
      yield call(handleError, e as ProductError);
      yield call(handleAction, undefined, `Item failed to add: ${(e as ProductError)?.message}`, "error");
    }
    return;
  }

  if (editProduct.started.match(action)) {
    try {
      yield call(initRequest);

      const { image, imageCollection } = action.payload.updates;
      let newUpdates: EditProductPayload["updates"] = { ...action.payload.updates };

      if (image?.constructor === File && typeof image === "object") {
        try {
          yield call(firebase.deleteImage, action.payload.id);
        } catch (e) {
          console.error("Failed to delete image ", e);
        }

        const url = yield call(firebase.storeImage, action.payload.id, "products", image);
        newUpdates = { ...newUpdates, image: url };
      }

      if (imageCollection?.length && imageCollection.length > 1) {
        const existingUploads: ImageFile[] = [];
        const newUploads: { file: File }[] = [];

        imageCollection.forEach((img) => {
          const file = img.file;
          if (file) {
            newUploads.push({ file });
          } else {
            existingUploads.push(img);
          }
        });

        const imageKeys = yield all(newUploads.map(() => call(firebase.generateKey)));
        const imageUrls: string[] = yield all(
          newUploads.map((img, i) => call(firebase.storeImage, imageKeys[i](), "products", img.file))
        );
        const images = imageUrls.map((url, i) => ({ id: imageKeys[i](), url }));
        newUpdates = { ...newUpdates, imageCollection: [...existingUploads, ...images] };
      } else if (newUpdates.image) {
        newUpdates = {
          ...newUpdates,
          imageCollection: [{ id: new Date().getTime().toString(), url: newUpdates.image }],
        };
        // add image thumbnail to image collection from newUpdates to
        // make sure you're adding the url not the file object.
      }

      yield call(firebase.editProduct, action.payload.id, newUpdates);
      yield put(
        editProduct.done({
          result: {
            id: action.payload.id,
            updates: newUpdates,
          },
          params: action.payload,
        })
      );
      yield call(handleAction, ADMIN_PRODUCTS, "Item succesfully edited", "success");
      yield put(setLoading(false));
    } catch (e) {
      yield call(handleError, e as ProductError);
      yield call(handleAction, undefined, `Item failed to edit: ${(e as ProductError).message}`, "error");
    }
    return;
  }

  if (removeProduct.started.match(action)) {
    try {
      yield call(initRequest);
      yield call(firebase.removeProduct, action.payload);
      yield put(removeProduct.done({ params: action.payload }));
      yield put(setLoading(false));
      yield call(handleAction, ADMIN_PRODUCTS, "Item succesfully removed", "success");
    } catch (e) {
      yield call(handleError, e as ProductError);
      yield call(handleAction, undefined, `Item failed to remove: ${(e as ProductError).message}`, "error");
    }
    return;
  }

  if (searchProduct.started.match(action)) {
    try {
      yield call(initRequest);
      // clear search data
      yield put(clearSearchState());

      const state = yield select();
      const result: { products: Product[]; lastKey?: string; total?: number } = yield call(
        firebase.searchProducts,
        action.payload.searchKey
      );

      if (result.products.length === 0) {
        yield call(handleError, new Error("No product found."));
        yield put(clearSearchState());
      } else {
        yield put(
          searchProduct.done({
            result: {
              items: result.products,
              lastRefKey: result.lastKey ?? state.products.searchedProducts.lastRefKey,
              total: result.total ?? state.products.searchedProducts.total,
            },
            params: action.payload,
          })
        );
        yield put(setRequestStatus({ message: "" }));
      }
      yield put(setLoading(false));
    } catch (e) {
      yield call(handleError, e as ProductError);
    }
    return;
  }

  throw new Error(`Unexpected action type ${action.type}`);
}
