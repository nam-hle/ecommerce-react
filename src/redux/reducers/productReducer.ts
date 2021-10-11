import { AnyAction } from "typescript-fsa";

import {
  addProduct,
  clearSearchState,
  editProduct,
  getProducts,
  removeProduct,
  searchProduct,
} from "../actions/productActions";

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

const initState: ProductState = {
  lastRefKey: null,
  total: 0,
  items: [],
  searchedProducts: {
    lastRefKey: null,
    total: 0,
    items: [],
  },
};

export function productReducer(state: ProductState | undefined, action: AnyAction): ProductState {
  if (state === undefined) {
    return initState;
  }

  if (getProducts.done.match(action)) {
    return {
      ...state,
      lastRefKey: action.payload.result.lastRefKey,
      total: action.payload.result.total,
      items: [...state.items, ...action.payload.result.items],
    };
  }

  if (addProduct.done.match(action)) {
    return {
      ...state,
      items: [...state.items, action.payload.result],
    };
  }

  if (searchProduct.done.match(action)) {
    return {
      ...state,
      searchedProducts: {
        lastRefKey: action.payload.result.lastRefKey,
        total: action.payload.result.total,
        items: [...state.searchedProducts.items, ...action.payload.result.items],
      },
    };
  }

  if (clearSearchState.match(action)) {
    return {
      ...state,
      searchedProducts: initState,
    };
  }

  if (removeProduct.done.match(action)) {
    return {
      ...state,
      items: state.items.filter((product) => product.id !== action.payload.result),
    };
  }

  if (editProduct.done.match(action)) {
    return {
      ...state,
      items: state.items.map((product) => {
        if (product.id === action.payload.result.id) {
          return {
            ...product,
            ...action.payload.result.updates,
          };
        }
        return product;
      }),
    };
  }

  return state;
}
