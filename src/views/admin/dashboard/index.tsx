import React from "react";

import { useDocumentTitle, useScrollTop } from "../../../hooks";

export const Dashboard: React.FC = () => {
  useDocumentTitle("Welcome | Admin Dashboard");
  useScrollTop();

  return (
    <div className="loader">
      <h2>Welcome to admin dashboard</h2>
    </div>
  );
};
