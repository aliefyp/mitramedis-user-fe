import clsx from "clsx";
import * as React from "react";

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export default function Card({ children, className, onClick }: CardProps) {
  return (
    <div
      className={clsx("rounded-xl bg-white shadow-sm", className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
