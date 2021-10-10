import {
  APPLY_FILTER,
  CLEAR_RECENT_SEARCH,
  REMOVE_SELECTED_RECENT,
  RESET_FILTER,
  SET_BRAND_FILTER,
  SET_MAX_PRICE_FILTER,
  SET_MIN_PRICE_FILTER,
  SET_TEXT_FILTER,
} from "../../constants";
import { Filter } from "../reducers/filterReducer";

export type SetTextFilterPayload = string;

export const setTextFilter = (keyword: string) => ({
  type: SET_TEXT_FILTER,
  payload: keyword,
});

export type SetBrandFilterPayload = string;

export const setBrandFilter = (brand: string) => ({
  type: SET_BRAND_FILTER,
  payload: brand,
});

export type SetMinPriceFilterPayload = number;

export const setMinPriceFilter = (min: number) => ({
  type: SET_MIN_PRICE_FILTER,
  payload: min,
});

export type SetMaxPriceFilterPayload = number;

export const setMaxPriceFilter = (max: string) => ({
  type: SET_MAX_PRICE_FILTER,
  payload: max,
});

export interface ResetFilterPayload {}

export const resetFilter = () => ({
  type: RESET_FILTER,
});

export interface ClearRecentSearchPayload {}

export const clearRecentSearch = () => ({
  type: CLEAR_RECENT_SEARCH,
});

export type RemoveSelectedRecentPayload = string;

export const removeSelectedRecent = (keyword: string) => ({
  type: REMOVE_SELECTED_RECENT,
  payload: keyword,
});

export type ApplyFilterPayload = Filter;

export const applyFilter = (filters: Filter) => ({
  type: APPLY_FILTER,
  payload: filters,
});
