import actionCreatorFactory from "typescript-fsa";

import { Item } from "../reducers";

const factory = actionCreatorFactory("BASKET");

export const setBasketItems = factory<SetBasketItemsPayload>("SET_BASKET_ITEMS");
export type SetBasketItemsPayload = Item[];

export const addToBasket = factory<AddToBasketPayload>("ADD_TO_BASKET");
export type AddToBasketPayload = Item;

export const removeFromBasket = factory<RemoveFromBasketPayload>("REMOVE_FROM_BASKET");
export type RemoveFromBasketPayload = string;

export const clearBasket = factory<ClearBasketPayload>("CLEAR_BASKET");
export interface ClearBasketPayload {}

export const addQtyItem = factory<AddQtyItemPayload>("ADD_QTY_ITEM");
export type AddQtyItemPayload = string;

export const minusQtyItem = factory<MinusQtyItemPayload>("MINUS_QTY_ITEM");
export type MinusQtyItemPayload = string;
