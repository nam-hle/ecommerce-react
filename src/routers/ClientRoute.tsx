import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { ADMIN_DASHBOARD, SIGNIN } from "../constants";
import { AppState } from "../redux";

const _ClientRoute: React.FC<ClientRouteProps> = ({ isAuth, role, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props: JSX.IntrinsicAttributes) => {
      if (isAuth && role === "USER") {
        return (
          <main className="content">
            <Component {...props} />
          </main>
        );
      }

      if (isAuth && role === "ADMIN") {
        return <Redirect to={ADMIN_DASHBOARD} />;
      }

      return (
        <Redirect
          to={{
            pathname: SIGNIN,
            state: { from: (props as any).location },
          }}
        />
      );
    }}
  />
);

_ClientRoute.defaultProps = {
  isAuth: false,
  role: "USER",
  exact: false,
};

type ClientRouteProps = {
  isAuth?: boolean;
  role?: string;
  location?: any;
  component: any;
  exact?: boolean;
  path: string;
};

const mapStateToProps = (params: AppState) => ({
  isAuth: !!params.auth,
  role: params.auth?.role || "",
});

export const ClientRoute = connect(mapStateToProps)(_ClientRoute);
