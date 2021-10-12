import { AnyAction } from "typescript-fsa";

import { addQtyItem, addToBasket, clearBasket, minusQtyItem, removeFromBasket, setBasketItems } from "../actions";

import { Product } from "./productReducer";

export interface Item extends Product {}

export type BasketState = Item[];

export function basketReducer(state: BasketState | undefined, action: AnyAction): BasketState {
  if (state === undefined) {
    return [];
  }

  if (setBasketItems.match(action)) {
    return action.payload;
  }

  if (addToBasket.match(action)) {
    return state.some((product) => product.id === action.payload.id) ? state : [action.payload, ...state];
  }

  if (removeFromBasket.match(action)) {
    return state.filter((product) => product.id !== action.payload);
  }

  if (clearBasket.match(action)) {
    return [];
  }

  if (addQtyItem.match(action)) {
    return state.map((product) => {
      if (product.id === action.payload) {
        return {
          ...product,
          quantity: product.quantity + 1,
        };
      }
      return product;
    });
  }

  if (minusQtyItem.match(action)) {
    return state.map((product) => {
      if (product.id === action.payload) {
        return {
          ...product,
          quantity: product.quantity - 1,
        };
      }
      return product;
    });
  }

  return state;
}
