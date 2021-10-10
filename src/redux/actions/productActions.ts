import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  CANCEL_GET_PRODUCTS,
  CLEAR_SEARCH_STATE,
  EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCTS,
  GET_PRODUCTS_SUCCESS,
  REMOVE_PRODUCT,
  REMOVE_PRODUCT_SUCCESS,
  SEARCH_PRODUCT,
  SEARCH_PRODUCT_SUCCESS,
} from "../../constants";

export const getProducts = (lastRef: string) => ({
  type: GET_PRODUCTS,
  payload: lastRef,
});

export const getProductsSuccess = (products: string) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export const cancelGetProducts = () => ({
  type: CANCEL_GET_PRODUCTS,
});

export const addProduct = (product: string) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export const searchProduct = (searchKey: string) => ({
  type: SEARCH_PRODUCT,
  payload: {
    searchKey,
  },
});

export const searchProductSuccess = (products: string) => ({
  type: SEARCH_PRODUCT_SUCCESS,
  payload: products,
});

export const clearSearchState = () => ({
  type: CLEAR_SEARCH_STATE,
});

export const addProductSuccess = (product: string) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

export const removeProduct = (id: string) => ({
  type: REMOVE_PRODUCT,
  payload: id,
});

export const removeProductSuccess = (id: string) => ({
  type: REMOVE_PRODUCT_SUCCESS,
  payload: id,
});

export const editProduct = (id: string, updates: string) => ({
  type: EDIT_PRODUCT,
  payload: {
    id,
    updates,
  },
});

export const editProductSuccess = (updates: string) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: updates,
});
