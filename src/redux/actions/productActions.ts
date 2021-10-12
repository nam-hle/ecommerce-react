import actionCreatorFactory from "typescript-fsa";

import { Product, SearchedProduct } from "../reducers/productReducer";
const factory = actionCreatorFactory("PRODUCT");

export const getProducts = factory.async<GetProductsPayload, GetProductsSuccessPayload>("GET_PRODUCTS");
export type GetProductsPayload = string;
export type GetProductsSuccessPayload = SearchedProduct;

export const cancelGetProducts = factory<CancelGetProductsPayload>("CANCEL_GET_PRODUCTS");
export interface CancelGetProductsPayload {}

export const addProduct = factory.async<AddProductPayload, AddProductSuccessPayload>("ADD_PRODUCT");
export interface AddProductPayload extends Product {
  imageCollection: { id: number; url: string; file: string }[];
  image: string;
}
export type AddProductSuccessPayload = Product;

export const searchProduct = factory.async<SearchProductPayload, SearchProductSuccessPayload>("SEARCH_PRODUCT");
export interface SearchProductPayload {
  searchKey: string;
}
export type SearchProductSuccessPayload = SearchedProduct;

export const clearSearchState = factory<ClearSearchStatePayload>("CLEAR_SEARCH_STATE");
export type ClearSearchStatePayload = void;

export const removeProduct = factory.async<RemoveProductPayload, RemoveProductSuccessPayload>("REMOVE_PRODUCT");
export type RemoveProductPayload = string;
export type RemoveProductSuccessPayload = string | undefined;

export const editProduct = factory.async<EditProductPayload, EditProductSuccessPayload>("EDIT_PRODUCT");
export interface EditProductPayload {
  id: string;
  updates: Product & {
    imageCollection: { file?: Blob; id: number; url: string }[];
    image: Blob;
  };
}
export interface EditProductSuccessPayload {
  id: string;
  updates: Product;
}
