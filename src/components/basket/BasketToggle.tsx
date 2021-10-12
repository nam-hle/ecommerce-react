import * as React from "react";

export const BasketToggle = (params: { children: React.FC<{ onClickToggle: () => void }> }) => {
  const onClickToggle = () => {
    if (document.body.classList.contains("is-basket-open")) {
      document.body.classList.remove("is-basket-open");
    } else {
      document.body.classList.add("is-basket-open");
    }
  };

  document.addEventListener("click", (e) => {
    const closest = (e.target as HTMLElement)?.closest?.(".basket");
    const toggle = (e.target as HTMLElement)?.closest(".basket-toggle");
    const closeToggle = (e.target as HTMLElement)?.closest(".basket-item-remove");

    if (!closest && document.body.classList.contains("is-basket-open") && !toggle && !closeToggle) {
      document.body.classList.remove("is-basket-open");
    }
  });

  return params.children({ onClickToggle });
};
