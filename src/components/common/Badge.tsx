import React from "react";

export const Badge: React.FC<BadgeProps> = ({ count, children }) => (
  <div className="badge">
    {children}
    {count >= 1 && <span className="badge-count">{count}</span>}
  </div>
);

type BadgeProps = {
  count: number;
  children: React.ReactNode | React.ReactNode[];
};
