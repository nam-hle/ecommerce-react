import {
  ADD_QTY_ITEM,
  ADD_TO_BASKET,
  CLEAR_BASKET,
  MINUS_QTY_ITEM,
  REMOVE_FROM_BASKET,
  SET_BASKET_ITEMS,
} from "../../constants";
import { ActionWithPayload } from "./index";
import {
  AddQtyItemPayload,
  AddToBasketPayload,
  ClearBasketPayload,
  MinusQtyItemPayload,
  RemoveFromBasketPayload,
  SetBasketItemPayload,
} from "../actions/basketActions";

export interface Item {
  id: string;
  quantity: number;
}

export type BasketState = Item[];

export type SetBasketItemAction = ActionWithPayload<typeof SET_BASKET_ITEMS, SetBasketItemPayload>;
export type AddToBasketAction = ActionWithPayload<typeof ADD_TO_BASKET, AddToBasketPayload>;
export type RemoveFromBasketAction = ActionWithPayload<typeof REMOVE_FROM_BASKET, RemoveFromBasketPayload>;
export type ClearBasketAction = ActionWithPayload<typeof CLEAR_BASKET, ClearBasketPayload>;
export type AddQtyItemAction = ActionWithPayload<typeof ADD_QTY_ITEM, AddQtyItemPayload>;
export type MinusQtyItemAction = ActionWithPayload<typeof MINUS_QTY_ITEM, MinusQtyItemPayload>;

export type BasketAction =
  | SetBasketItemAction
  | AddToBasketAction
  | RemoveFromBasketAction
  | ClearBasketAction
  | AddQtyItemAction
  | MinusQtyItemAction;

export default (state: BasketState = [], action: BasketAction) => {
  switch (action.type) {
    case SET_BASKET_ITEMS:
      return action.payload;
    case ADD_TO_BASKET:
      return state.some((product) => product.id === action.payload.id) ? state : [action.payload, ...state];
    case REMOVE_FROM_BASKET:
      return state.filter((product) => product.id !== action.payload);
    case CLEAR_BASKET:
      return [];
    case ADD_QTY_ITEM:
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: product.quantity + 1,
          };
        }
        return product;
      });
    case MINUS_QTY_ITEM:
      return state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            quantity: product.quantity - 1,
          };
        }
        return product;
      });
    default:
      return state;
  }
};
