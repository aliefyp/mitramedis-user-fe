import clsx from "clsx";
import * as React from "react";

type NavProps = {
  children?: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
};

export default function Nav({
  children,
  className,
  orientation = "horizontal"
}: NavProps) {
  return (
    <nav
      className={clsx(
        "flex flex-wrap gap-2",
        orientation === "vertical" && "flex-col",
        className
      )}
    >
      {children}
    </nav>
  );
}