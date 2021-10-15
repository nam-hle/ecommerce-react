import { LoadingOutlined } from "@ant-design/icons";

import React from "react";

import { useDocumentTitle, useScrollTop } from "../../../hooks";
import { UserAccountTab, UserOrdersTab, UserTab, UserWishListTab } from "../components";

export const Loader: React.FC = () => (
  <div className="loader" style={{ minHeight: "80vh" }}>
    <LoadingOutlined />
    <h6>Loading ... </h6>
  </div>
);

export const UserAccount: React.FC = () => {
  useScrollTop();
  useDocumentTitle("My Account | Salinaka");

  return (
    <UserTab>
      {/* @ts-ignore */}
      <div key={0} label="Account">
        <UserAccountTab />
      </div>
      {/* @ts-ignore */}
      <div key={1} label="Wishlist">
        <UserWishListTab />
      </div>
      {/* @ts-ignore */}
      <div key={2} label="Orders">
        <UserOrdersTab />
      </div>
    </UserTab>
  );
};
