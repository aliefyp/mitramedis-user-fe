import { Dialog } from "@headlessui/react";
import React from "react";

type ModalHeaderProps = {
  children?: React.ReactNode;
};

export default function ModalHeader({ children }: ModalHeaderProps) {
  return (
    <Dialog.Title
      as="h3"
      className="mt-6 px-6 pb-2 !text-lg font-bold leading-6"
    >
      {children}
    </Dialog.Title>
  );
}
