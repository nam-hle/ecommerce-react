import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

import { Form, Formik } from "formik";

import PropType from "prop-types";
import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import * as Yup from "yup";

import { Boundary } from "../../../components/common";
import { CHECKOUT_STEP_1, CHECKOUT_STEP_3 } from "../../../constants";
import { useDocumentTitle, useScrollTop } from "../../../hooks";
import { setShippingDetails } from "../../../redux";

import { StepTracker } from "../components";
import withCheckout from "../hoc/withCheckout";

import ShippingForm from "./ShippingForm";
import ShippingTotal from "./ShippingTotal";

const FormSchema = Yup.object().shape({
  fullname: Yup.string()
    .required("Full name is required.")
    .min(2, "Full name must be at least 2 characters long.")
    .max(60, "Full name must only be less than 60 characters."),
  email: Yup.string().email("Email is not valid.").required("Email is required."),
  address: Yup.string().required("Shipping address is required."),
  mobile: Yup.object()
    .shape({
      country: Yup.string(),
      countryCode: Yup.string(),
      dialCode: Yup.string().required("Mobile number is required"),
      value: Yup.string().required("Mobile number is required"),
    })
    .required("Mobile number is required."),
  isInternational: Yup.boolean(),
  isDone: Yup.boolean(),
});

export const ShippingDetails : React.FC<ShippingDetailsProps> = ({ profile, shipping, subtotal }) => {
  useDocumentTitle("Check Out Step 2 | Salinaka");
  useScrollTop();
  const dispatch = useDispatch();
  const history = useHistory();

  const initFormikValues = {
    fullname: shipping.fullname || profile.fullname || "",
    email: shipping.email || profile.email || "",
    address: shipping.address || profile.address || "",
    mobile: shipping.mobile || profile.mobile || {},
    isInternational: shipping.isInternational || false,
    isDone: shipping.isDone || false,
  };

  export const onSubmitForm : React.FC<onSubmitFormProps> = (form) => {
    dispatch(
      setShippingDetails({
        fullname: form.fullname,
        email: form.email,
        address: form.address,
        mobile: form.mobile,
        isInternational: form.isInternational,
        isDone: true,
      })
    );
    history.push(CHECKOUT_STEP_3);
  };

  return (
    <Boundary>
      <div className="checkout">
        <StepTracker current={2} />
        <div className="checkout-step-2">
          <h3 className="text-center">Shipping Details</h3>
          <Formik
            initialValues={initFormikValues}
            validateOnChange
            validationSchema={FormSchema}
            onSubmit={onSubmitForm}>
            {() => (
              <Form>
                <ShippingForm />
                <br />
                {/*  ---- TOTAL --------- */}
                <ShippingTotal subtotal={subtotal} />
                <br />
                {/*  ----- NEXT/PREV BUTTONS --------- */}
                <div className="checkout-shipping-action">
                  <button className="button button-muted" onClick={() => history.push(CHECKOUT_STEP_1)} type="button">
                    <ArrowLeftOutlined />
                    &nbsp; Go Back
                  </button>
                  <button className="button button-icon" type="submit">
                    Next Step &nbsp;
                    <ArrowRightOutlined />
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </Boundary>
  );
};

type ShippingDetailsProps = {
  subtotal: number,
  profile: PropType.shape({
    fullname?: string,
    email?: string,
    address?: string,
    mobile?: object,
  }).isRequired,
  shipping: PropType.shape({
    fullname?: string,
    email?: string,
    address?: string,
    mobile?: object,
    isInternational?: bool,
    isDone?: bool,
  }).isRequired,
};

export default withCheckout(ShippingDetails);
