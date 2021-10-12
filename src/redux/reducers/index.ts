import { ReducersMapObject } from "redux";
import { AnyAction } from "typescript-fsa";

import { authReducer, AuthState } from "./authReducer";
import { basketReducer, BasketState } from "./basketReducer";
import { checkoutReducer, CheckoutState } from "./checkoutReducer";
import { filterReducer, FilterState } from "./filterReducer";
import { miscReducer, MiscState } from "./miscReducer";
import { productReducer, ProductState } from "./productReducer";
import { profileReducer, ProfileState } from "./profileReducer";
import { userReducer, UserState } from "./userReducer";

export interface AppState {
  auth: AuthState;
  basket: BasketState;
  checkout: CheckoutState;
  filter: FilterState;
  products: ProductState;
  profile: ProfileState;
  users: UserState;
  app: MiscState;
}

export const rootReducer: ReducersMapObject<AppState, AnyAction> = {
  products: productReducer,
  basket: basketReducer,
  auth: authReducer,
  profile: profileReducer,
  filter: filterReducer,
  users: userReducer,
  checkout: checkoutReducer,
  app: miscReducer,
};

export * from "./authReducer";
export * from "./basketReducer";
export * from "./checkoutReducer";
export * from "./filterReducer";
export * from "./miscReducer";
export * from "./productReducer";
export * from "./profileReducer";
export * from "./userReducer";
