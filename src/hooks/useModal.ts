import { useMemo, useState } from "react";

export const useModal = () => {
  const [isOpenModal, setModalOpen] = useState(false);

  const onOpenModal = () => {
    console.log("onOpenModal");
    setModalOpen(() => true);
  };

  const onCloseModal = (from: string) => {
    console.log("onCloseModal", from);
    setModalOpen(() => false);
  };

  return useMemo(
    () => ({
      isOpenModal,
      onOpenModal,
      onCloseModal,
    }),
    [isOpenModal]
  );
};
