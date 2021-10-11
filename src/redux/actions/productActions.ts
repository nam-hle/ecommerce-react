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
import { Product, SearchedProduct } from "../reducers/productReducer";

export type GetProductsPayload = string;

export const getProducts = (lastRef: string) => ({
  type: GET_PRODUCTS,
  payload: lastRef,
});

export type GetProductsSuccessPayload = SearchedProduct;

export const getProductsSuccess = (products: Product) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
});

export interface CancelGetProductsPayload {}

export const cancelGetProducts = () => ({
  type: CANCEL_GET_PRODUCTS,
});

export type AddProductPayload = Product;

export const addProduct = (product: Product) => ({
  type: ADD_PRODUCT,
  payload: product,
});

export interface SearchProductPayload {
  searchKey: string;
}

export const searchProduct = (searchKey: string) => ({
  type: SEARCH_PRODUCT,
  payload: {
    searchKey,
  },
});

export type SearchProductSuccessPayload = SearchedProduct;

export const searchProductSuccess = (products: string) => ({
  type: SEARCH_PRODUCT_SUCCESS,
  payload: products,
});

export interface ClearSearchStatePayload {}

export const clearSearchState = () => ({
  type: CLEAR_SEARCH_STATE,
});

export type AddProductSuccessPayload = Product;

export const addProductSuccess = (product: string) => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product,
});

export type RemoveProductPayload = string;

export const removeProduct = (id: string) => ({
  type: REMOVE_PRODUCT,
  payload: id,
});

export type RemoveProductSuccessPayload = string;

export const removeProductSuccess = (id: string) => ({
  type: REMOVE_PRODUCT_SUCCESS,
  payload: id,
});

export interface EditProductPayload {
  id: string;
  updates: any;
}

export const editProduct = (id: string, updates: string) => ({
  type: EDIT_PRODUCT,
  payload: {
    id,
    updates,
  },
});

export interface EditProductSuccessPayload {
  id: string;
  updates: any;
}

export const editProductSuccess = (updates: string) => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload: updates,
});
