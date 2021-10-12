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
      <Modal isOpen={isOpenModal} onRequestClose={onCloseModal}>
        <div className="filters-toggle-sub">
          <Filters closeModal={onCloseModal} />
        </div>
        <button className="modal-close-button" onClick={onCloseModal} type="button">
          <i className="fa fa-times-circle" />
        </button>
      </Modal>
    </>
  );
};

type FiltersToggleProps = {
  children: React.ReactNode | React.ReactNode[];
};
