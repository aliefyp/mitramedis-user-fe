import clsx from "clsx";
import * as React from "react";

type CardBodyProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function CardBody({ children, className }: CardBodyProps) {
  return <div className={clsx("p-4", className)}>{children}</div>;
}
