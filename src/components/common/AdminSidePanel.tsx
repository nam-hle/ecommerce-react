import React from "react";
import { NavLink } from "react-router-dom";

import { ADMIN_PRODUCTS } from "../../constants";

export const AdminSideBar = () => (
  <aside className="sidenavigation">
    <div className="sidenavigation-wrapper">
      <div className="sidenavigation-item">
        <NavLink activeClassName="sidenavigation-menu-active" className="sidenavigation-menu" to={ADMIN_PRODUCTS}>
          Products
        </NavLink>
      </div>
      <div className="sidenavigation-item">
        <h4 className="sidenavigation-menu my-0">Users</h4>
      </div>
    </div>
  </aside>
);
