import clsx from "clsx";
import * as React from "react";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

export default function Card({ children, className }: CardProps) {
  return (
    <div className={clsx("rounded-xl bg-white shadow-sm", className)}>
      {children}
    </div>
  );
}