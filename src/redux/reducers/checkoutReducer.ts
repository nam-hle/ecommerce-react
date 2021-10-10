import { RESET_CHECKOUT, SET_CHECKOUT_PAYMENT_DETAILS, SET_CHECKOUT_SHIPPING_DETAILS } from "../../constants";
import { ActionWithPayload } from ".";
import {
  PaymentDetails,
  ResetCheckoutPayload,
  SetCheckoutPaymentDetailsPayload,
  SetCheckoutShippingDetailsPayload,
  ShippingDetails,
} from "../actions/checkoutActions";

const defaultState: CheckoutState = {
  shipping: {},
  payment: {
    type: "paypal",
    name: "",
    cardnumber: "",
    expiry: "",
    ccv: "",
  },
};

export interface CheckoutState {
  shipping: ShippingDetails;
  payment: PaymentDetails;
}

export type SetCheckoutShippingDetailsAction = ActionWithPayload<
  typeof SET_CHECKOUT_SHIPPING_DETAILS,
  SetCheckoutShippingDetailsPayload
>;

export type SetCheckoutPaymentDetailsAction = ActionWithPayload<
  typeof SET_CHECKOUT_PAYMENT_DETAILS,
  SetCheckoutPaymentDetailsPayload
>;

export type ResetCheckoutAction = ActionWithPayload<typeof RESET_CHECKOUT, ResetCheckoutPayload>;

export type CheckoutAction = SetCheckoutPaymentDetailsAction | SetCheckoutShippingDetailsAction | ResetCheckoutAction;

export default (state = defaultState, action: CheckoutAction) => {
  switch (action.type) {
    case SET_CHECKOUT_SHIPPING_DETAILS:
      return {
        ...state,
        shipping: action.payload,
      };
    case SET_CHECKOUT_PAYMENT_DETAILS:
      return {
        ...state,
        payment: action.payload,
      };
    case RESET_CHECKOUT:
      return defaultState;
    default:
      return state;
  }
};
