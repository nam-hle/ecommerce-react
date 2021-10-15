import actionCreatorFactory from "typescript-fsa";

import { Mobile } from "../reducers";

const factory = actionCreatorFactory("CHECKOUT");

export const setShippingDetails = factory<SetCheckoutShippingPayload>("SET_CHECKOUT_SHIPPING_DETAILS");
export type SetCheckoutShippingPayload = Shipping;

export interface Shipping {
  fullname: string;
  email: string;
  address: string;
  mobile?: Mobile;
  isInternational?: boolean;
  isDone?: boolean;
}

export const setPaymentDetails = factory<SetCheckoutPaymentPayload>("SET_CHECKOUT_PAYMENT_DETAILS");
export type SetCheckoutPaymentPayload = Payment;
export interface Payment {
  type: string;
  name: string;
  cardnumber?: string;
  expiry: string;
  ccv?: string;
}

export const resetCheckout = factory<ResetCheckoutPayload>("RESET_CHECKOUT");
export interface ResetCheckoutPayload {}
