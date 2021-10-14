import { useFormikContext } from "formik";

import React from "react";

import { displayMoney } from "../../../helpers";

export const ShippingTotal: React.FC<ShippingTotalProps> = ({ subtotal }) => {
  const { values } = useFormikContext();

  return (
    <div className="checkout-total d-flex-end padding-right-m">
      <table>
        <tbody>
          <tr>
            <td>
              <span className="d-block margin-0 padding-right-s text-right">International Shipping: &nbsp;</span>
            </td>
            <td>
              <h4 className="basket-total-amount text-subtle text-right margin-0 ">
                {/*@ts-ignore*/}
                {values.isInternational ? "$50.00" : "$0.00"}
              </h4>
            </td>
          </tr>
          <tr>
            <td>
              <span className="d-block margin-0 padding-right-s text-right">Subtotal: &nbsp;</span>
            </td>
            <td>
              <h4 className="basket-total-amount text-subtle text-right margin-0">{displayMoney(subtotal)}</h4>
            </td>
          </tr>
          <tr>
            <td>
              <span className="d-block margin-0 padding-right-s text-right">Total: &nbsp;</span>
            </td>
            <td>
              <h2 className="basket-total-amount text-right">
                {/* @ts-ignore */}
                {displayMoney(Number(subtotal) + (values.isInternational ? 50 : 0))}
              </h2>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

type ShippingTotalProps = {
  subtotal: number;
};
