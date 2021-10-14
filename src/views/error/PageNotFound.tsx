import React from "react";

import { useScrollTop } from "../../hooks";

export const PageNotFound: React.FC<PageNotFoundProps> = ({ history }) => {
  useScrollTop();

  return (
    <div className="page-not-found">
      <h1>:( Page you are looking for doesn&apos;t exists.</h1>
      <br />
      <button className="button" onClick={history.goBack} type="button">
        Go back
      </button>
    </div>
  );
};

type PageNotFoundProps = {
  history: {
    goBack: () => void;
  };
};
