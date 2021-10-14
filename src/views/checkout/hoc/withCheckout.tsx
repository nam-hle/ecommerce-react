import React from "react";
import { useSelector } from "react-redux";
import { Redirect, withRouter } from "react-router-dom";

import { SIGNIN } from "../../../constants";

import { calculateTotal } from "../../../helpers";
import { AppState, BasketState, CheckoutState, ProfileState } from "../../../redux";

export const withCheckout = (Component: any) =>
  withRouter((props) => {
    const state = useSelector<
      AppState,
      {
        isAuth: boolean;
        basket: BasketState;
        shipping: CheckoutState["shipping"];
        payment: CheckoutState["payment"];
        profile: ProfileState;
      }
    >((store) => ({
      isAuth: !!store.auth?.id && !!store.auth?.role,
      basket: store.basket,
      shipping: store.checkout.shipping,
      payment: store.checkout.payment,
      profile: store.profile,
    }));

    const shippingFee = state.shipping.isInternational ? 50 : 0;
    const subtotal = calculateTotal(state.basket.map((product) => product.price * product.quantity));

    if (!state.isAuth) {
      return <Redirect to={SIGNIN} />;
    }
    if (state.basket.length === 0) {
      return <Redirect to="/" />;
    }
    if (state.isAuth && state.basket.length !== 0) {
      return (
        <Component
          {...props}
          basket={state.basket}
          payment={state.payment}
          profile={state.profile}
          shipping={state.shipping}
          subtotal={Number(subtotal + shippingFee)}
        />
      );
    }
    return null;
  });
