import React from "react";

import { useScrollTop } from "../../hooks";

export const Error: React.FC<ErrorProps> = ({ history }) => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1>:( An error has occured. Please try again.</h1>
      <br />
      <button className="button" onClick={() => history.push("/")} type="button">
        Try Again
      </button>
    </div>
  );
};

type ErrorProps = {
  history: {
    push: (path: string) => void;
  };
};
