import { ArrowRightOutlined, LoadingOutlined } from "@ant-design/icons";

import { Field, Form, Formik } from "formik";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as Yup from "yup";

import { SocialLogin } from "../../../components/common";
import { CustomInput } from "../../../components/formik";
import { SIGNIN } from "../../../constants";
import { useDocumentTitle, useScrollTop } from "../../../hooks";
import { signUp, setAuthenticating, setAuthStatus, AppState, MiscState } from "../../../redux";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email is not valid.").required("Email is required."),
  password: Yup.string()
    .required("Password is required.")
    .min(8, "Password length should be at least 8 characters.")
    .matches(/[A-Z\W]/g, "Password should contain at least 1 uppercase letter."),
  fullname: Yup.string().required("Full name is required.").min(4, "Name should be at least 4 characters."),
});

export type SignInSchemaForm = {
  email: string;
  password: string;
  fullname: string;
};

export const SignUp: React.FC<SignUpProps> = ({ history }) => {
  const { isAuthenticating, authStatus } = useSelector<
    AppState,
    { isAuthenticating: boolean; authStatus: MiscState["authStatus"] }
  >((state) => ({
    isAuthenticating: state.app.isAuthenticating,
    authStatus: state.app.authStatus,
  }));
  const dispatch = useDispatch();

  useScrollTop();
  useDocumentTitle("Sign Up | Salinaka");

  useEffect(
    () => () => {
      dispatch(setAuthStatus(null));
      dispatch(setAuthenticating(false));
    },
    [dispatch]
  );

  const onClickSignIn = () => history.push(SIGNIN);

  const onFormSubmit = (form: SignInSchemaForm) => {
    dispatch(
      signUp({
        fullname: form.fullname.trim(),
        email: form.email.trim().toLowerCase(),
        password: form.password.trim(),
      })
    );
  };

  return (
    <div className="auth-content">
      {authStatus?.success && (
        <div className="loader">
          <h3 className="toast-success auth-success">
            {authStatus?.message}
            <LoadingOutlined />
          </h3>
        </div>
      )}
      {!authStatus?.success && (
        <>
          {authStatus?.message && <h5 className="text-center toast-error">{authStatus?.message}</h5>}
          <div className={`auth ${authStatus?.message && !authStatus?.success && "input-error"}`}>
            <div className="auth-main">
              <h3>Sign up to Salinaka</h3>
              <Formik
                initialValues={{
                  fullname: "",
                  email: "",
                  password: "",
                }}
                validateOnChange
                validationSchema={SignInSchema}
                onSubmit={onFormSubmit}>
                {() => (
                  <Form>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="fullname"
                        type="text"
                        label="* Full Name"
                        placeholder="John Doe"
                        style={{ textTransform: "capitalize" }}
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="email"
                        type="email"
                        label="* Email"
                        placeholder="test@example.com"
                        component={CustomInput}
                      />
                    </div>
                    <div className="auth-field">
                      <Field
                        disabled={isAuthenticating}
                        name="password"
                        type="password"
                        label="* Password"
                        placeholder="Your Password"
                        component={CustomInput}
                      />
                    </div>
                    <br />
                    <div className="auth-field auth-action auth-action-signup">
                      <button className="button auth-button" disabled={isAuthenticating} type="submit">
                        {isAuthenticating ? "Signing Up" : "Sign Up"}
                        &nbsp;
                        {isAuthenticating ? <LoadingOutlined /> : <ArrowRightOutlined />}
                      </button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
            <div className="auth-divider">
              <h6>OR</h6>
            </div>
            <SocialLogin isLoading={isAuthenticating} />
          </div>
          <div className="auth-message">
            <span className="auth-info">
              <strong>Already have an account?</strong>
            </span>
            <button
              className="button button-small button-border button-border-gray"
              disabled={isAuthenticating}
              onClick={onClickSignIn}
              type="button">
              Sign In
            </button>
          </div>
        </>
      )}
    </div>
  );
};

type SignUpProps = {
  history: {
    push: (path: string) => void;
  };
};
