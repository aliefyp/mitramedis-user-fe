import React from "react";

type ModalBodyProps = {
  children?: React.ReactNode;
};

export default function ModalBody({ children }: ModalBodyProps) {
  return <div className="px-6 mt-2">{children}</div>;
}