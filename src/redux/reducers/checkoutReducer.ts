import { AnyAction } from "typescript-fsa";

import { Payment, setPaymentDetails, setShippingDetails, Shipping } from "../actions";

export interface CheckoutState {
  shipping: Shipping;
  payment: Payment;
}

const initState: CheckoutState = {
  shipping: {
    fullname: "",
    email: "",
    address: "",
    mobile: undefined,
  },
  payment: {
    type: "paypal",
    name: "",
    cardnumber: "",
    expiry: "",
    ccv: "",
  },
};

export function checkoutReducer(state: CheckoutState | undefined, action: AnyAction): CheckoutState {
  if (state === undefined) {
    return initState;
  }

  if (setShippingDetails.match(action)) {
    return {
      ...state,
      shipping: action.payload,
    };
  }

  if (setPaymentDetails.match(action)) {
    return {
      ...state,
      payment: action.payload,
    };
  }

  return state;
}
