import { useLayoutEffect } from "react";

export const useDocumentTitle = (title: string) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = "Salinaka - eCommerce React App";
    }
  }, [title]);
};
