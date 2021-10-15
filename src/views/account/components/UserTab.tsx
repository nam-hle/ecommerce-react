import React, { useState } from "react";

export const UserTab: React.FC<UserTabProps> = (props) => {
  const { children } = props;
  const [activeTab, setActiveTab] = useState(0);
  const onClickTabItem = (index: number) => setActiveTab(index);

  return (
    <div className="user-tab">
      <div className="user-tab-nav">
        <ul className="user-tab-menu">
          {children.map((child, index) => (
            <li
              key={index}
              className={`user-tab-item ${index === activeTab ? "user-tab-active" : ""}`}
              role="presentation"
              onClick={() => onClickTabItem(index)}>
              {child.props.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="user-tab-content">
        {children.map((child, index) => {
          if (index !== activeTab) {
            return null;
          }

          return child.props.children;
        })}
      </div>
    </div>
  );
};

type UserTabProps = {
  children: any[];
};
