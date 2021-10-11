import { Reducer } from "redux";
import {
  ADD_PRODUCT_SUCCESS,
  CLEAR_SEARCH_STATE,
  EDIT_PRODUCT_SUCCESS,
  GET_PRODUCTS_SUCCESS,
  REMOVE_PRODUCT_SUCCESS,
  SEARCH_PRODUCT_SUCCESS,
} from "../../constants";
import {
  AddProductSuccessPayload,
  ClearSearchStatePayload,
  EditProductSuccessPayload,
  RemoveProductSuccessPayload,
  SearchProductSuccessPayload,
} from "../actions/productActions";
import { GetProductsSuccessPayload } from "../actions/productActions";
import { ActionWithPayload } from "./index";

export interface Product {
  id: string;
}

export interface SearchedProduct {
  lastRefKey: string | null;
  total: number;
  items: Product[];
}

export interface ProductState extends SearchedProduct {
  searchedProducts: SearchedProduct;
}

export type GetProductsSuccessAction = ActionWithPayload<typeof GET_PRODUCTS_SUCCESS, GetProductsSuccessPayload>;
export type AddProductSuccessAction = ActionWithPayload<typeof ADD_PRODUCT_SUCCESS, AddProductSuccessPayload>;
export type EditProductSuccessAction = ActionWithPayload<typeof EDIT_PRODUCT_SUCCESS, EditProductSuccessPayload>;
export type RemoveProductSuccessAction = ActionWithPayload<typeof REMOVE_PRODUCT_SUCCESS, RemoveProductSuccessPayload>;

export type SearchProductSuccessAction = ActionWithPayload<typeof SEARCH_PRODUCT_SUCCESS, SearchProductSuccessPayload>;
export type ClearSearchStateAction = ActionWithPayload<typeof CLEAR_SEARCH_STATE, ClearSearchStatePayload>;

export type ProductAction =
  | GetProductsSuccessAction
  | AddProductSuccessAction
  | RemoveProductSuccessAction
  | EditProductSuccessAction
  | SearchProductSuccessAction
  | ClearSearchStateAction;

const initState: SearchedProduct = {
  lastRefKey: null,
  total: 0,
  items: [],
};

export type ProductReducer = Reducer<ProductState, ProductAction>;

export const miscReducer: ProductReducer = (
  state: ProductState = {
    lastRefKey: null,
    total: 0,
    items: [],
    searchedProducts: initState,
  },
  action: ProductAction
) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        lastRefKey: action.payload.lastRefKey,
        total: action.payload.total,
        items: [...state.items, ...action.payload.items],
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case SEARCH_PRODUCT_SUCCESS:
      return {
        ...state,
        searchedProducts: {
          lastRefKey: action.payload.lastRefKey,
          total: action.payload.total,
          items: [...state.searchedProducts.items, ...action.payload.items],
        },
      };
    case CLEAR_SEARCH_STATE:
      return {
        ...state,
        searchedProducts: initState,
      };
    case REMOVE_PRODUCT_SUCCESS:
      return {
        ...state,
        items: state.items.filter((product) => product.id !== action.payload),
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        items: state.items.map((product) => {
          if (product.id === action.payload.id) {
            return {
              ...product,
              ...action.payload.updates,
            };
          }
          return product;
        }),
      };
    default:
      return state;
  }
};
