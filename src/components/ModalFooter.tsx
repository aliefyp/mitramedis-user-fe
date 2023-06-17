import React from "react";

type ModalFooterProps = {
  children?: React.ReactNode;
};

export default function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse">
      {children}
    </div>
  );
}