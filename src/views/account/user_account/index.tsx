import { LoadingOutlined } from "@ant-design/icons";

import React, { lazy, Suspense } from "react";

import { useDocumentTitle, useScrollTop } from "../../../hooks";

import UserTab from "../components/UserTab";

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
      <div key={0}>
        <Suspense fallback={<Loader />}>
          <UserAccountTab />
        </Suspense>
      </div>
      <div key={1}>
        <Suspense fallback={<Loader />}>
          <UserWishListTab />
        </Suspense>
      </div>
      <div key={2}>
        <Suspense fallback={<Loader />}>
          <UserOrdersTab />
        </Suspense>
      </div>
    </UserTab>
  );
};

export default UserAccount;
