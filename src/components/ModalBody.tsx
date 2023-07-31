import clsx from "clsx";
import React, { ReactElement } from "react";

interface ModalBodyProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
}

export default function ModalBody({ children, className }: ModalBodyProps) {
  return <div className={clsx("mt-2 px-6", className)}>{children}</div>;
}
