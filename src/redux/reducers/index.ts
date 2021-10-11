import { Action } from "redux";
import { authReducer, AuthState } from "./authReducer";
import { basketReducer, BasketState } from "./basketReducer";
import { checkoutReducer, CheckoutState } from "./checkoutReducer";
import { filterReducer, FilterState } from "./filterReducer";
import { miscReducer, MiscState } from "./miscReducer";
import { productReducer, ProductState } from "./productReducer";
import { profileReducer, ProfileState } from "./profileReducer";
import { userReducer, UserState } from "./userReducer";

export interface ActionWithPayload<Type, Payload> extends Action {
  type: Type;
  payload: Payload;
}

export interface AppState {
  auth: AuthState;
  basket: BasketState;
  checkout: CheckoutState;
  filter: FilterState;
  products: ProductState;
  profile: ProfileState;
  user: UserState;
  app: MiscState;
}

const rootReducer = {
  products: productReducer,
  basket: basketReducer,
  auth: authReducer,
  profile: profileReducer,
  filter: filterReducer,
  users: userReducer,
  checkout: checkoutReducer,
  app: miscReducer,
};

export default rootReducer;
