import { ArrowRightOutlined, ShopOutlined } from "@ant-design/icons";

import PropType from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { BasketItem } from "../../../components/basket";
import { CHECKOUT_STEP_2 } from "../../../constants";
import { displayMoney } from "../../../helpers";
import { useDocumentTitle, useScrollTop } from "../../../hooks";

import { StepTracker } from "../components";
import withCheckout from "../hoc/withCheckout";

export const OrderSummary : React.FC<OrderSummaryProps> = ({ basket, subtotal }) => {
  useDocumentTitle("Check Out Step 1 | Salinaka");
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();
  export const onClickPrevious : React.FC<onClickPreviousProps> = () => history.push("/");
  export const onClickNext : React.FC<onClickNextProps> = () => history.push(CHECKOUT_STEP_2);

  return (
    <div className="checkout">
      <StepTracker current={1} />
      <div className="checkout-step-1">
        <h3 className="text-center">Order Summary</h3>
        <span className="d-block text-center">Review items in your basket.</span>
        <br />
        <div className="checkout-items">
          {basket.map((product) => (
            <BasketItem basket={basket} dispatch={dispatch} key={product.id} product={product} />
          ))}
        </div>
        <br />
        <div className="basket-total text-right">
          <p className="basket-total-title">Subtotal:</p>
          <h2 className="basket-total-amount">{displayMoney(subtotal)}</h2>
        </div>
        <br />
        <div className="checkout-shipping-action">
          <button className="button button-muted" onClick={onClickPrevious} type="button">
            <ShopOutlined />
            &nbsp; Continue Shopping
          </button>
          <button className="button" onClick={onClickNext} type="submit">
            Next Step &nbsp;
            <ArrowRightOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};

type OrderSummaryProps = {
  basket: PropType.arrayOf(PropType.object).isRequired,
  subtotal: number,
};

export default withCheckout(OrderSummary);
