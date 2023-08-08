import clsx from "clsx";
import React from "react";

type ModalFooterProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function ModalFooter({ children, className }: ModalFooterProps) {
  return (
    <div
      className={clsx(
        "flex justify-end gap-2 rounded-b-2xl bg-gray-50 px-6 py-4",
        className
      )}
    >
      {children}
    </div>
  );
}
