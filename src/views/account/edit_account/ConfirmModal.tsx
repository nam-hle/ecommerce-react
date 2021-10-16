import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

import { useFormikContext } from "formik";
import React, { useState } from "react";

import { Modal } from "../../../components";

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ onConfirmUpdate, modal }) => {
  const [password, setPassword] = useState("");
  const { values } = useFormikContext();

  return (
    <Modal isOpen={modal.isOpenModal} onRequestClose={() => modal.onCloseModal("edit_account")}>
      <div className="text-center padding-l">
        <h4>Confirm Update</h4>
        <p>
          To continue updating profile including your &nbsp;
          <strong>email</strong>
          ,
          <br />
          please confirm by entering your password
        </p>
        <input
          className="input-form d-block"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
          type="password"
          value={password}
        />
      </div>
      <br />
      <div className="d-flex-center">
        <button
          className="button"
          onClick={() => {
            onConfirmUpdate(values, password);
            modal.onCloseModal("edit_account");
          }}
          type="button">
          <CheckOutlined />
          &nbsp; Confirm
        </button>
      </div>
      <button
        className="modal-close-button button button-border button-border-gray button-small"
        onClick={() => modal.onCloseModal("edit_account")}
        type="button">
        <CloseOutlined />
      </button>
    </Modal>
  );
};

type ConfirmModalProps = {
  onConfirmUpdate: (values: any, password: string) => void;
  modal: {
    onCloseModal: (from: string) => void;
    isOpenModal: boolean;
  };
};
