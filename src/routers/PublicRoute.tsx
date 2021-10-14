import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { ADMIN_DASHBOARD, SIGNIN, SIGNUP } from "../constants";
import { AppState } from "../redux";

const _PublicRoute: React.FC<PublicRouteProps> = ({ isAuth, role, component: Component, path, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      // @ts-ignore
      const { from } = props.location.state || { from: { pathname: "/" } };

      if (isAuth && role === "ADMIN") {
        return <Redirect to={ADMIN_DASHBOARD} />;
      }

      if (isAuth && role === "USER" && (path === SIGNIN || path === SIGNUP)) {
        return <Redirect to={from} />;
      }

      return (
        <main className="content">
          <Component {...props} />
        </main>
      );
    }}
  />
);

_PublicRoute.defaultProps = {
  isAuth: false,
  role: "USER",
  path: "/",
  exact: false,
};

type PublicRouteProps = {
  isAuth?: boolean;
  role?: string;
  component: any;
  path?: string;
  exact?: boolean;
};

const mapStateToProps = (params: AppState) => ({
  isAuth: !!params.auth,
  role: params.auth?.role || "",
});

export const PublicRoute = connect(mapStateToProps)(_PublicRoute);
