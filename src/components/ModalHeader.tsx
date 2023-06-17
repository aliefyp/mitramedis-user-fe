import { Dialog } from "@headlessui/react";
import React from "react";

type ModalHeaderProps = {
  children?: React.ReactNode;
};

export default function ModalHeader({ children }: ModalHeaderProps) {
  return (
    <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900 px-6 mt-4"
    >
      {children}
    </Dialog.Title>
  );
}