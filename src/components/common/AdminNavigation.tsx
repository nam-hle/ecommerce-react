import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import logo from "../../../static/logo-full.png";
import { ADMIN_DASHBOARD } from "../../constants";
import { ProfileState, AppState } from "../../redux";
import { UserAvatar } from "../../views/account/components/UserAvatar";

export const AdminNavigation = () => {
  const { isAuthenticating, profile } = useSelector<AppState, { isAuthenticating: boolean; profile: ProfileState }>(
    (state) => ({
      isAuthenticating: state.app.isAuthenticating,
      profile: state.profile,
    })
  );

  return (
    <nav className="navigation navigation-admin">
      <div className="logo">
        <Link to={ADMIN_DASHBOARD} style={{ display: "flex", alignItems: "center" }}>
          <img alt="Logo" src={logo} />
          <h3>ADMIN PANEL</h3>
        </Link>
      </div>
      <ul className="navigation-menu">
        <li className="navigation-menu-item">
          {/* @ts-ignore */}
          <UserAvatar isAuthenticating={isAuthenticating} profile={profile} />
        </li>
      </ul>
    </nav>
  );
};
