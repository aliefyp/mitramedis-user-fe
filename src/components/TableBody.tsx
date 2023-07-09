import clsx from "clsx";
import * as React from "react";

type TableBodyProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function TableBody({ children, className }: TableBodyProps) {
  return (
    <tbody className={clsx("divide-y divide-gray-200 bg-white", className)}>
      {children}
    </tbody>
  );
}
