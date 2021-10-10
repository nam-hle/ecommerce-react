import { RESET_CHECKOUT, SET_CHECKOUT_PAYMENT_DETAILS, SET_CHECKOUT_SHIPPING_DETAILS } from "../../constants";

export interface ShippingDetails {
  fullname?: string;
  email?: string;
  address?: string;
  mobile?: string;
  isInternational?: boolean;
  isDone?: boolean;
}

export type SetCheckoutShippingDetailsPayload = ShippingDetails;

export const setShippingDetails = (details: ShippingDetails) => ({
  type: SET_CHECKOUT_SHIPPING_DETAILS,
  payload: details,
});

export interface PaymentDetails {
  type: string;
  name: string;
  cardnumber: string;
  expiry: string;
  ccv: string;
}

export type SetCheckoutPaymentDetailsPayload = PaymentDetails;

export const setPaymentDetails = (details: PaymentDetails) => ({
  type: SET_CHECKOUT_PAYMENT_DETAILS,
  payload: details,
});

export interface ResetCheckoutPayload {}

export const resetCheckout = () => ({
  type: RESET_CHECKOUT,
});
