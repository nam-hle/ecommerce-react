import { AnyAction } from "typescript-fsa";

import {
  applyFilter,
  clearRecentSearch,
  removeSelectedRecent,
  resetFilter,
  setBrandFilter,
  setMaxPriceFilter,
  setMinPriceFilter,
  setTextFilter,
} from "../actions";

export interface Filter {
  recent?: string[];
  keyword?: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

export type FilterState = Filter;

const initState: FilterState = {
  recent: [],
  keyword: "",
  brand: "",
  minPrice: 0,
  maxPrice: 0,
  sortBy: "",
};

export function filterReducer(state: FilterState | undefined, action: AnyAction): FilterState {
  if (state === undefined) {
    return initState;
  }

  if (setTextFilter.match(action)) {
    return {
      ...state,
      recent:
        !!state.recent?.find((n) => n === action.payload) || action.payload === ""
          ? state.recent
          : [action.payload, ...(state.recent ?? [])],
      keyword: action.payload,
    };
  }

  if (setBrandFilter.match(action)) {
    return {
      ...state,
      brand: action.payload,
    };
  }

  if (setMaxPriceFilter.match(action)) {
    return {
      ...state,
      maxPrice: action.payload,
    };
  }

  if (setMinPriceFilter.match(action)) {
    return {
      ...state,
      minPrice: action.payload,
    };
  }

  if (resetFilter.match(action)) {
    return initState;
  }

  if (clearRecentSearch.match(action)) {
    return {
      ...state,
      recent: [],
    };
  }

  if (removeSelectedRecent.match(action)) {
    return {
      ...state,
      recent: state.recent?.filter((item) => item !== action.payload),
    };
  }

  if (applyFilter.match(action)) {
    return {
      ...state,
      ...action.payload,
    };
  }
  return state;
}
