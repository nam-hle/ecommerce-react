import { useDispatch, useSelector } from "react-redux";

import { displayActionMessage } from "../helpers/utils";
import { addToBasket as dispatchAddToBasket, removeFromBasket } from "../redux/actions/basketActions";
import { AppState } from "../redux/reducers";
import { BasketState } from "../redux/reducers/basketReducer";
import { Product } from "../redux/reducers/productReducer";

export const useBasket = () => {
  const basket = useSelector<AppState, BasketState>((state) => state.basket);
  const dispatch = useDispatch();

  const isItemOnBasket = (id: string) => !!basket.find((item) => item.id === id);

  const addToBasket = (product: Product) => {
    if (isItemOnBasket(product.id)) {
      dispatch(removeFromBasket(product.id));
      displayActionMessage("Item removed from basket", "info");
    } else {
      dispatch(dispatchAddToBasket({ ...product, quantity: 1 }));
      displayActionMessage("Item added to basket", "success");
    }
  };

  return { basket, isItemOnBasket, addToBasket };
};
