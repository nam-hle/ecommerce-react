import { ArrowLeftOutlined, CheckOutlined, LoadingOutlined } from "@ant-design/icons";

import { Field, useFormikContext } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";

import { CustomInput, CustomMobileInput } from "../../../components";
import { ACCOUNT } from "../../../constants";

export const EditForm: React.FC<EditFormProps> = ({ isLoading, authProvider }) => {
  const history = useHistory();
  const { values, submitForm } = useFormikContext();

  return (
    <div className="user-profile-details">
      <Field
        disabled={isLoading}
        name="fullname"
        type="text"
        label="* Full Name"
        placeholder="Enter your full name"
        component={CustomInput}
        style={{ textTransform: "capitalize" }}
      />
      <Field
        disabled={authProvider !== "password" || isLoading}
        name="email"
        type="email"
        label="* Email Address"
        placeholder="test@example.com"
        component={CustomInput}
      />
      <Field
        disabled={isLoading}
        name="address"
        type="text"
        label="Address (Will be used for checkout)"
        placeholder="#245 Brgy. Maligalig, Arayat Pampanga, Philippines"
        component={CustomInput}
        style={{ textTransform: "capitalize" }}
      />
      <CustomMobileInput
        defaultValue={(values as any).mobile}
        name="mobile"
        disabled={isLoading}
        label="Mobile Number (Will be used for checkout)"
      />
      <br />
      <div className="edit-user-action">
        <button
          className="button button-muted w-100-mobile"
          disabled={isLoading}
          onClick={() => history.push(ACCOUNT)}
          type="button">
          <ArrowLeftOutlined />
          &nbsp; Back to Profile
        </button>
        <button className="button w-100-mobile" disabled={isLoading} onClick={submitForm} type="button">
          {isLoading ? <LoadingOutlined /> : <CheckOutlined />}
          &nbsp;
          {isLoading ? "Updating Profile" : "Update Profile"}
        </button>
      </div>
    </div>
  );
};

type EditFormProps = {
  isLoading: boolean;
  authProvider: string;
};
