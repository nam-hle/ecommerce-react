import React from "react";

import { useModal } from "../../hooks";

import { Filters } from "./Filters";
import { Modal } from "./Modal";

export const FiltersToggle: React.FC<FiltersToggleProps> = ({ children }) => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();

  return (
    <>
      <div className="filters-toggle" onClick={onOpenModal} role="presentation">
        {children}
      </div>
      <Modal isOpen={isOpenModal} onRequestClose={() => onCloseModal("filter 1")}>
        <div className="filters-toggle-sub">
          <Filters
            closeModal={(subwhere: string) => {
              console.log({ subwhere });
              onCloseModal("filter 2");
            }}
          />
        </div>
        <button className="modal-close-button" onClick={() => onCloseModal("filter 3")} type="button">
          <i className="fa fa-times-circle" />
        </button>
      </Modal>
    </>
  );
};

type FiltersToggleProps = {
  children: React.ReactNode | React.ReactNode[];
};
