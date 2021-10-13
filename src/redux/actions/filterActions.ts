import actionCreatorFactory from "typescript-fsa";

import { Filter } from "../reducers";

const factory = actionCreatorFactory("FILTER");

export const setTextFilter = factory<SetTextFilterPayload>("SET_TEXT_FILTER");
export type SetTextFilterPayload = string;

export const setBrandFilter = factory<SetBrandFilterPayload>("SET_BRAND_FILTER");
export type SetBrandFilterPayload = string;

export const setMinPriceFilter = factory<SetMinPriceFilterPayload>("SET_MIN_PRICE_FILTER");
export type SetMinPriceFilterPayload = number;

export const setMaxPriceFilter = factory<SetMaxPriceFilterPayload>("SET_MAX_PRICE_FILTER");
export type SetMaxPriceFilterPayload = number;

export const resetFilter = factory<ResetFilterPayload>("RESET_FILTER");
export interface ResetFilterPayload {}

export const clearRecentSearch = factory<ClearRecentSearchPayload>("CLEAR_RECENT_SEARCH");
export interface ClearRecentSearchPayload {}

export const removeSelectedRecent = factory<RemoveSelectedRecentPayload>("REMOVE_SELECTED_RECENT");
export type RemoveSelectedRecentPayload = string;

export const applyFilter = factory<ApplyFilterPayload>("APPLY_FILTER");
export type ApplyFilterPayload = Partial<Filter>;
