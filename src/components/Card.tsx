import clsx from "clsx";
import * as React from "react";

interface CardProps extends React.HTMLProps<HTMLDivElement> {
  children?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function Card({
  children,
  className,
  onClick,
  ...rest
}: CardProps) {
  return (
    <div
      className={clsx("rounded-xl bg-white shadow-sm", className)}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  );
}
