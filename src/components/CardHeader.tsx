import clsx from "clsx";
import * as React from "react";
import Typography from "./Typography";

type CardHeaderProps = {
  children?: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
};

export default function CardHeader({
  children,
  className,
  title,
  subtitle,
}: CardHeaderProps) {
  return (
    <div
      className={clsx("flex items-center justify-between px-6 pt-6", className)}
    >
      <div>
        <Typography as="div" variant="h3">
          {title}
        </Typography>
        <Typography small className="!text-gray-500">
          {subtitle}
        </Typography>
      </div>
      {children}
    </div>
  );
}
