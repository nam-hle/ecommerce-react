import {
  ADD_QTY_ITEM,
  ADD_TO_BASKET,
  CLEAR_BASKET,
  MINUS_QTY_ITEM,
  REMOVE_FROM_BASKET,
  SET_BASKET_ITEMS,
} from "../../constants";
import { Item } from "../reducers/basketReducer";

export type SetBasketItemsPayload = Item[];

export const setBasketItems = (items: Item[] = []) => ({
  type: SET_BASKET_ITEMS,
  payload: items,
});

export type AddToBasketPayload = Item;

export const addToBasket = (product: Item) => ({
  type: ADD_TO_BASKET,
  payload: product,
});

export type RemoveFromBasketPayload = string;

export const removeFromBasket = (id: string) => ({
  type: REMOVE_FROM_BASKET,
  payload: id,
});

export interface ClearBasketPayload {}

export const clearBasket = () => ({
  type: CLEAR_BASKET,
});

export type AddQtyItemPayload = string;

export const addQtyItem = (id: string) => ({
  type: ADD_QTY_ITEM,
  payload: id,
});

export type MinusQtyItemPayload = string;

export const minusQtyItem = (id: string) => ({
  type: MINUS_QTY_ITEM,
  payload: id,
});
