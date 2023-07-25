import React from "react";

type ModalFooterProps = {
  children?: React.ReactNode;
};

export default function ModalFooter({ children }: ModalFooterProps) {
  return (
    <div className="flex justify-end gap-2 rounded-b-2xl bg-gray-50 px-6 py-4">
      {children}
    </div>
  );
}
