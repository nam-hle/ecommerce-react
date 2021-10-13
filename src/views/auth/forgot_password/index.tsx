import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useDidMount, useDocumentTitle, useScrollTop } from "../../../hooks";

import { AppState, MiscState, resetPassword } from "../../../redux";

export const ForgotPassword: React.FC = () => {
  const { authStatus, isAuthenticating } = useSelector<
    AppState,
    { isAuthenticating: boolean; authStatus: MiscState["authStatus"] }
  >((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus,
  }));
  const dispatch = useDispatch();
  const didMount = useDidMount();
  const [forgotPWStatus, setForgotPWStatus] = useState<MiscState["authStatus"]>(null);
  const [isSendingForgotPWRequest, setIsSending] = useState(false);
  const [field, setField] = useState<{ email?: string; error?: string }>({});

  useScrollTop();
  useDocumentTitle("Forgot Password | Salinaka");
  useEffect(() => {
    if (didMount) {
      setForgotPWStatus(authStatus);
      setIsSending(isAuthenticating);
    }
  }, [authStatus, didMount, isAuthenticating]);

  const onEmailChange = (value: string, error: string) => {
    setField({ email: value, error });
  };

  const onSubmitEmail = () => {
    if (!!field.email && !field.error) {
      dispatch(resetPassword(field.email));
    }
  };

  return (
    <div className="forgot_password">
      {forgotPWStatus?.message && (
        <h5 className={`text-center ${authStatus?.success ? "toast-success" : "toast-error"}`}>
          {authStatus?.message}
        </h5>
      )}
      <h3>Forgot Your Password?</h3>
      <p>Enter your email address and we will send you a password reset email.</p>
      <br />
      <input
        field="email"
        required
        className="input-form"
        label="* Email"
        maxLength={40}
        // @ts-ignore
        onChange={onEmailChange}
        placeholder="Enter your email"
        readOnly={isSendingForgotPWRequest || authStatus?.success}
        type="email"
        style={{ width: "100%" }}
      />
      <br />
      <br />
      <button
        className="button w-100-mobile"
        disabled={isSendingForgotPWRequest || authStatus?.success}
        onClick={onSubmitEmail}
        type="button">
        {isSendingForgotPWRequest ? <LoadingOutlined /> : <CheckOutlined />}
        &nbsp;
        {isSendingForgotPWRequest ? "Sending Password Reset Email" : "Send Password Reset Email"}
      </button>
    </div>
  );
};
