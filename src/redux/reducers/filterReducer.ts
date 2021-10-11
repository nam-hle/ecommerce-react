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
import {
  ApplyFilterPayload,
  ClearRecentSearchPayload,
  RemoveSelectedRecentPayload,
  ResetFilterPayload,
  SetBrandFilterPayload,
  SetMaxPriceFilterPayload,
  SetMinPriceFilterPayload,
  SetTextFilterPayload,
} from "../actions/filterActions";
import { ActionWithPayload } from "./index";

export interface Filter {
  recent: string[];
  keyword: string;
  brand: string;
  minPrice: number;
  maxPrice: number;
  sortBy: string;
}

const initState: Filter = {
  recent: [],
  keyword: "",
  brand: "",
  minPrice: 0,
  maxPrice: 0,
  sortBy: "",
};

export type SetTextFilterAction = ActionWithPayload<typeof SET_TEXT_FILTER, SetTextFilterPayload>;
export type SetBrandFilterAction = ActionWithPayload<typeof SET_BRAND_FILTER, SetBrandFilterPayload>;
export type SetMinPriceFilterAction = ActionWithPayload<typeof SET_MIN_PRICE_FILTER, SetMinPriceFilterPayload>;
export type SetMaxPriceFilterAction = ActionWithPayload<typeof SET_MAX_PRICE_FILTER, SetMaxPriceFilterPayload>;
export type ResetFilterAction = ActionWithPayload<typeof RESET_FILTER, ResetFilterPayload>;
export type ClearRecentSearchAction = ActionWithPayload<typeof CLEAR_RECENT_SEARCH, ClearRecentSearchPayload>;
export type RemoveSelectedRecentAction = ActionWithPayload<typeof REMOVE_SELECTED_RECENT, RemoveSelectedRecentPayload>;
export type ApplyFilterAction = ActionWithPayload<typeof APPLY_FILTER, ApplyFilterPayload>;

export type FilterAction =
  | SetTextFilterAction
  | SetBrandFilterAction
  | SetMinPriceFilterAction
  | SetMaxPriceFilterAction
  | ResetFilterAction
  | ClearRecentSearchAction
  | RemoveSelectedRecentAction
  | ApplyFilterAction;

export default (state = initState, action: FilterAction) => {
  switch (action.type) {
    case SET_TEXT_FILTER:
      return {
        ...state,
        recent:
          !!state.recent.find((n) => n === action.payload) || action.payload === ""
            ? state.recent
            : [action.payload, ...state.recent],
        keyword: action.payload,
      };
    case SET_BRAND_FILTER:
      return {
        ...state,
        brand: action.payload,
      };
    case SET_MAX_PRICE_FILTER:
      return {
        ...state,
        maxPrice: action.payload,
      };
    case SET_MIN_PRICE_FILTER:
      return {
        ...state,
        minPrice: action.payload,
      };
    case RESET_FILTER:
      return initState;
    case CLEAR_RECENT_SEARCH:
      return {
        ...state,
        recent: [],
      };
    case REMOVE_SELECTED_RECENT:
      return {
        ...state,
        recent: state.recent.filter((item) => item !== action.payload),
      };
    case APPLY_FILTER:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
