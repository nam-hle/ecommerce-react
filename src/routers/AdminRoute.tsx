import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

import { AdminNavigation, AdminSideBar } from "../components/common";
import { AppState } from "../redux";

const _AdminRoute: React.FC<AdminRouteProps> = ({ isAuth, role, component: Component, ...rest }) => (
  <Route
    {...rest}
    component={(props: JSX.IntrinsicAttributes) =>
      isAuth && role === "ADMIN" ? (
        <>
          <AdminNavigation />
          <main className="content-admin">
            <AdminSideBar />
            <div className="content-admin-wrapper">
              <Component {...props} />
            </div>
          </main>
        </>
      ) : (
        <Redirect to="/" />
      )
    }
  />
);

const mapStateToProps = ({ auth }: AppState) => ({
  isAuth: !!auth,
  role: auth?.role || "",
});

_AdminRoute.defaultProps = {
  isAuth: false,
  role: "USER",
};

type AdminRouteProps = {
  isAuth: boolean;
  role: string;
  component: any;
  exact?: boolean;
  path: string;
};

export const AdminRoute = connect(mapStateToProps)(_AdminRoute);
