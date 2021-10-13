import { Form, Formik } from "formik";

import PropType from "prop-types";
import React from "react";
import { Redirect } from "react-router-dom";
import * as Yup from "yup";

import { CHECKOUT_STEP_1 } from "../../../constants";

import { displayActionMessage } from "../../../helpers";
import { useDocumentTitle, useScrollTop } from "../../../hooks";

import { StepTracker } from "../components";
import withCheckout from "../hoc/withCheckout";

import CreditPayment from "./CreditPayment";
import PayPalPayment from "./PayPalPayment";
import Total from "./Total";

const FormSchema = Yup.object().shape({
  name: Yup.string().min(4, "Name should be at least 4 characters.").required("Name is required"),
  cardnumber: Yup.string()
    .min(13, "Card number should be 13-19 digits long")
    .max(19, "Card number should only be 13-19 digits long")
    .required("Card number is required."),
  expiry: Yup.date().required("Credit card expiry is required."),
  ccv: Yup.string()
    .min(3, "CCV length should be 3-4 digit")
    .max(4, "CCV length should only be 3-4 digit")
    .required("CCV is required."),
  type: Yup.string().required("Please select paymend mode"),
});

export const Payment : React.FC<PaymentProps> = ({ shipping, payment, subtotal }) => {
  useDocumentTitle("Check Out Final Step | Salinaka");
  useScrollTop();

  const initFormikValues = {
    name: payment.name || "",
    cardnumber: payment.cardnumber || "",
    expiry: payment.expiry || "",
    ccv: payment.ccv || "",
    type: payment.type || "paypal",
  };

  export const onConfirm : React.FC<onConfirmProps> = () => {
    displayActionMessage("Feature not ready yet :)", "info");
  };

  if (!shipping || !shipping.isDone) {
    return <Redirect to={CHECKOUT_STEP_1} />;
  }
  return (
    <div className="checkout">
      <StepTracker current={3} />
      <Formik
        initialValues={initFormikValues}
        validateOnChange
        validationSchema={FormSchema}
        validate={(form) => {
          if (form.type === "paypal") {
            displayActionMessage("Feature not ready yet :)", "info");
          }
        }}
        onSubmit={onConfirm}>
        {() => (
          <Form className="checkout-step-3">
            <CreditPayment />
            <PayPalPayment />
            <Total isInternational={shipping.isInternational} subtotal={subtotal} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

type PaymentProps = {
  shipping: PropType.shape({
    isDone?: bool,
    isInternational?: bool,
  }).isRequired,
  payment: PropType.shape({
    name?: string,
    cardnumber?: string,
    expiry?: string,
    ccv?: string,
    type?: string,
  }).isRequired,
  subtotal: number,
};

export default withCheckout(Payment);
