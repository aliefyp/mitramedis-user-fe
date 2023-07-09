import clsx from "clsx";
import * as React from "react";

type TableCellProps = {
  align?: "center" | "left" | "right";
  children?: React.ReactNode;
  className?: string;
  head?: boolean;
};

const alignments: Record<string, string> = {
  center: "text-center",
  left: "text-left",
  right: "text-right",
};

export default function TableCell({
  align = "left",
  children,
  className,
  head,
}: TableCellProps) {
  const Component = head ? "th" : "td";
  return (
    <Component
      className={clsx(
        "whitespace-nowrap px-4 py-3",
        alignments[align],
        className
      )}
    >
      {children}
    </Component>
  );
}
