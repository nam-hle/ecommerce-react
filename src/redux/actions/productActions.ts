import actionCreatorFactory from "typescript-fsa";

import { ProductFormSchema } from "../../views/admin";

import { Product, SearchedProduct } from "../reducers";
const factory = actionCreatorFactory("PRODUCT");

export const getProducts = factory.async<GetProductsPayload, GetProductsSuccessPayload>("GET_PRODUCTS");
export type GetProductsPayload = string | null;
export type GetProductsSuccessPayload = SearchedProduct;

export const cancelGetProducts = factory<CancelGetProductsPayload>("CANCEL_GET_PRODUCTS");
export interface CancelGetProductsPayload {}

export const addProduct = factory.async<AddProductPayload, AddProductSuccessPayload>("ADD_PRODUCT");
export interface AddProductPayload extends Product {
  imageCollection: AddImageFile[];
  image: File;
}
export type AddProductSuccessPayload = Product;
export type ImageCollection = ImageFile[];
export type ImageFile = { id: string; file?: File; url?: string };
export type AddImageFile = { id: string; file: File; url?: string };

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
  updates: ProductFormSchema & {
    imageCollection?: ImageCollection;
    image?: string;
  };
}
export interface EditProductSuccessPayload {
  id: string;
  updates: ProductFormSchema;
}
